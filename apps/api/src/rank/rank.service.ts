import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { UserEntity } from '../user/user.decorators';

@Injectable()
export class RankService {
  private readonly FINISH_COUNT_KEY = `user:finishCount`;

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
    let res = [];
    for (let i = 0; i < rankList.length; i += 2) {
      let username = this.getUserName(rankList[i]);
      let count = rankList[i + 1];
      res.push({ username, count });
    }
    return res;
  }

  // return top 10 and self rank
  async getRankList(user: UserEntity) {
    // return [member, count, member, count, ...]
    let rankList = await this.redis.zrevrange(
      this.FINISH_COUNT_KEY,
      0,
      9,
      'WITHSCORES',
    );
    return {
      list: this.translateList(rankList),
      self: user
        ? await this.redis.zrevrank(
            this.FINISH_COUNT_KEY,
            `${user.userId}-${user.username}`,
          )
        : null,
    };
  }
}
