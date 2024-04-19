import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class OnlineService {
  private readonly ONLINE_USER_KEY = `online:user`;

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async addUser(userId: string) {
    await this.redis.sadd(this.ONLINE_USER_KEY, userId);
  }

  async removeUser(userId: string) {
    await this.redis.srem(this.ONLINE_USER_KEY, userId);
  }

  async getOnlineUserCount(): Promise<number> {
    const users = await this.redis.smembers(this.ONLINE_USER_KEY);
    return users.length;
  }
}
