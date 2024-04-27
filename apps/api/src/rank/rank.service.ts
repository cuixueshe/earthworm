import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable, Logger } from "@nestjs/common";
import Redis from "ioredis";

import { UserEntity } from "../user/user.decorators";
import { UserService } from "../user/user.service";

// 定义周期枚举
export enum RankPeriod {
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export type RankPeriodAlias = "weekly" | "monthly" | "yearly";

@Injectable()
export class RankService {
  private readonly FINISH_COUNT_KEY = `user:finishCount`;
  private readonly logger = new Logger(RankService.name);
  private readonly rankKeys = {
    [RankPeriod.WEEKLY]: `${this.FINISH_COUNT_KEY}`,
    [RankPeriod.MONTHLY]: `${this.FINISH_COUNT_KEY}:${RankPeriod.MONTHLY}Rank`,
    [RankPeriod.YEARLY]: `${this.FINISH_COUNT_KEY}:${RankPeriod.YEARLY}Rank`,
  };
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly userService: UserService,
  ) {}

  async userFinishCourse(userId: string) {
    const counts = {};
    for (const period of Object.keys(this.rankKeys)) {
      const rankKey = this.rankKeys[period];
      let count = await this.redis.zscore(rankKey, userId);
      if (!count) {
        await this.redis.zadd(rankKey, 1, userId);
      } else {
        await this.redis.zincrby(rankKey, 1, userId);
      }
      count = await this.redis.zscore(rankKey, userId);
      counts[period] = count;
    }

    return counts;
  }

  private convertRankListToObjectArray(rankList: string[]) {
    const res = [];
    for (let i = 0; i < rankList.length; i += 2) {
      const count = parseInt(rankList[i + 1] ?? "-1");
      res.push({ count, userId: rankList[i] });
    }
    return res;
  }

  /**
   * @description  return top 10 and self rank
   * @param user  current user
   * @param period  a certain period of time
   * @returns top 10 and self rank
   */
  async getRankList(user: UserEntity, period: RankPeriodAlias = RankPeriod.WEEKLY) {
    // return [member, count, member, count, ...]
    let self = null;
    const rankPeriod = this.rankKeys[period];
    const rankList = this.convertRankListToObjectArray(
      await this.redis.zrevrange(rankPeriod, 0, 24, "WITHSCORES"),
    );

    if (user) {
      const userRank = await this.redis.zrevrank(rankPeriod, user.userId);
      const userCount = await this.redis.zscore(rankPeriod, user.userId);
      self = {
        userId: user.userId,
        count: userCount === null ? -1 : parseInt(userCount),
        rank: userRank === null ? -1 : userRank + 1,
      };
    }

    await this.appendUserNameProperty(self, rankList);

    return {
      self,
      list: rankList,
    };
  }

  private async appendUserNameProperty(self, rankList) {
    const usersMap = await this.fetchUsersMap(
      Array.from(new Set([self.userId, ...rankList.map(({ userId }) => userId)])),
    );

    const rankListUsernameGenByUserId = (id: string) => {
      const user = usersMap[id];

      if (!user) {
        return "";
      }

      return user.username;
    };

    self.username = rankListUsernameGenByUserId(self.userId);
    rankList.forEach((info) => {
      info.username = rankListUsernameGenByUserId(info.userId);
    });
  }

  private async fetchUsersMap(uIds: string[]) {
    const promises = uIds.map((uId) => {
      return this.userService.findUser(uId);
    });

    const users = await Promise.all(promises);

    return users.reduce((obj, cur) => {
      if (cur) {
        obj[cur.id] = cur;
      }
      return obj;
    }, {});
  }

  async resetRankList(period: RankPeriodAlias = RankPeriod.WEEKLY) {
    const rankKey = this.rankKeys[period];
    try {
      await this.redis.del(rankKey);
      this.logger.verbose(`${period}重置排行榜成功: ${new Date()}`);
    } catch (error) {
      this.logger.error(`${period}重置排行榜时发生错误: ${error}`);
    }
  }
}
