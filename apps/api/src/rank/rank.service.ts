import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { UserEntity } from '../user/user.decorators';

@Injectable()
export class RankService {
  private readonly FINISH_COUNT_KEY = `user:finishCount`;
  private readonly logger = new Logger(RankService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async userFinishCourse(userId: number, username: string) {
    const member = `${userId}-${username}`;
    let count = await this.redis.zscore(this.FINISH_COUNT_KEY, member);
    if (!count) {
      await this.redis.zadd(this.FINISH_COUNT_KEY, 1, member);
    } else {
      await this.redis.zincrby(this.FINISH_COUNT_KEY, 1, member);
    }
    count = await this.redis.zscore(this.FINISH_COUNT_KEY, member);
    return count;
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

  // return top 10 and self rank
  async getRankList(user: UserEntity) {
    // return [member, count, member, count, ...]
    const rankList = await this.redis.zrevrange(
      this.FINISH_COUNT_KEY,
      0,
      9,
      'WITHSCORES',
    );
    let self = null;
    if (user) {
      const userRank = await this.redis.zrevrank(
        this.FINISH_COUNT_KEY,
        `${user.userId}-${user.username}`,
      );
      const userCount =
        (await this.redis.zscore(
          this.FINISH_COUNT_KEY,
          `${user.userId}-${user.username}`,
        )) ?? 0;
      self = { username: user.username, count: userCount, rank: userRank };
    }
    return {
      list: this.translateList(rankList),
      self,
    };
  }

  async resetRankList() {
    try {
      await this.redis.del(this.FINISH_COUNT_KEY);
      this.logger.verbose(`每周重置排行榜成功: ${new Date()}`);
    } catch (error) {
      this.logger.error(`重置排行榜时发生错误: ${error}`);
    }
  }
}
