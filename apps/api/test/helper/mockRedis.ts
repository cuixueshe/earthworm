import { getRedisConnectionToken } from "@nestjs-modules/ioredis";
import { Module, Provider } from "@nestjs/common";
import Redis from "ioredis-mock";

export const mockRedis = new Redis();
const MockRedisProvider: Provider = {
  provide: getRedisConnectionToken(),
  useValue: mockRedis,
};

@Module({
  providers: [MockRedisProvider],
  exports: [getRedisConnectionToken()],
})
export class MockRedisModule {}
