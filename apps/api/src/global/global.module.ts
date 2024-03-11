import { Global, Module } from '@nestjs/common';
import { DB, DbProvider } from './providers/db.provider';
import { ConfigModule } from '@nestjs/config';

const envConfig = {
  prod: '.env.prod',
  test: '.env.test',
};

const envFilePath = envConfig[process.env.NODE_ENV] || '.env';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
    }),
  ],
  providers: [DbProvider],
  exports: [DB],
})
export class GlobalModule {}
