import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from './global/providers/db.provider';
import {course} from '@earthwrom/shared'

@Injectable()
export class AppService {
  constructor(@Inject(DB) private db:  DbType) {}
  async getHello() {
    return await this.db.select().from(course)
  }
}
