import { Module } from '@nestjs/common';
import { GlobalModule } from '../global/global.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CourseModule } from '../course/course.module';
import { UserProgressModule } from '../user-progress/user-progress.module';
import { ToolModule } from '../tool/tool.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RankModule } from '../rank/rank.module';
import { GameModule } from '../game/game.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobModule } from '../cron-job/cron-job.module';
import { CourseHistoryModule } from '../course-history/course-history.module';

@Module({
  imports: [
    GlobalModule,
    UserModule,
    AuthModule,
    CourseModule,
    UserProgressModule,
    ToolModule,
    RankModule,
    GameModule,
    CronJobModule,
    CourseHistoryModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      }),
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
