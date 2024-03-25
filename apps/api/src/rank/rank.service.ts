import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { UserEntity } from '../user/user.decorators';

// 定义周期枚举
export enum RankPeriod {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export type RankPeriodAlias = 'weekly' | 'monthly' | 'yearly';

@Injectable()
export class RankService {
  private readonly FINISH_COUNT_KEY = `user:finishCount`;
  private readonly logger = new Logger(RankService.name);
  private readonly rankKeys = {
    [RankPeriod.WEEKLY]: `${this.FINISH_COUNT_KEY}`,
    [RankPeriod.MONTHLY]: `${this.FINISH_COUNT_KEY}:${RankPeriod.MONTHLY}Rank`,
    [RankPeriod.YEARLY]: `${this.FINISH_COUNT_KEY}:${RankPeriod.YEARLY}Rank`,
  };
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async userFinishCourse(userId: number, username: string) {
    const member = `${userId}-${username}`;

    const counts = {};
    for (const period of Object.keys(this.rankKeys)) {
      const rankKey = this.rankKeys[period];
      let count = await this.redis.zscore(rankKey, member);
      if (!count) {
        await this.redis.zadd(rankKey, 1, member);
      } else {
        await this.redis.zincrby(rankKey, 1, member);
      }
      count = await this.redis.zscore(rankKey, member);
      counts[period] = count;
    }

    return counts;
  }

  private getUserName(member: string) {
    return member.split('-')[1];
  }

  private translateList(rankList: string[]) {
    const res = [];
    for (let i = 0; i < rankList.length; i += 2) {
      const username = this.getUserName(rankList[i]);
      const count = rankList[i + 1];
      res.push({ username, count });
    }
    return res;
  }

  /**
   * @description  return top 10 and self rank
   * @param user  current user
   * @param period  a certain period of time
   * @returns top 10 and self rank
   */
  async getRankList(
    user: UserEntity,
    period: RankPeriodAlias = RankPeriod.WEEKLY,
  ) {
    // return [member, count, member, count, ...]
    const rankList = await this.redis.zrevrange(
      this.rankKeys[period],
      0,
      9,
      'WITHSCORES',
    );
    let self = null;
    if (user) {
      const userRank = await this.redis.zrevrank(
        this.rankKeys[period],
        `${user.userId}-${user.username}`,
      );
      const userCount =
        (await this.redis.zscore(
          this.rankKeys[period],
          `${user.userId}-${user.username}`,
        )) ?? 0;
      self = { username: user.username, count: userCount, rank: userRank };
    }
    return {
      list: this.translateList(rankList),
      self,
    };
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
