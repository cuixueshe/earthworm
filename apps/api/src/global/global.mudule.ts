import { Global, Module } from '@nestjs/common';
import { DB, DbProvider } from './providers/db.provider';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../../../.env'),
      isGlobal: true,
    }),
  ],
  providers: [DbProvider],
  exports: [DB],
})
export class GlobalModule {}
