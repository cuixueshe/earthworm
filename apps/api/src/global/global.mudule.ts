import { Global, Module } from '@nestjs/common';
import { DB, DbProvider } from './providers/db.provider';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      // TODO 缺一个 prod
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : '.env.test',
      isGlobal: true,
    }),
  ],
  providers: [DbProvider],
  exports: [DB],
})
export class GlobalModule {}
