import { RedisModule } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { CourseHistoryModule } from "../course-history/course-history.module";
import { CoursePackModule } from "../course-pack/course-pack.module";
import { CourseModule } from "../course/course.module";
import { CronJobModule } from "../cron-job/cron-job.module";
import { GlobalModule } from "../global/global.module";
import { LogtoModule } from "../logto/logto.module";
import { MembershipModule } from "../membership/membership.module";
import { RankModule } from "../rank/rank.module";
import { ToolModule } from "../tool/tool.module";
import { UserCourseProgressModule } from "../user-course-progress/user-course-progress.module";
import { UserLearnRecordModule } from "../user-learn-record/user-learn-record.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    GlobalModule,
    LogtoModule,
    UserModule,
    CoursePackModule,
    CourseModule,
    UserCourseProgressModule,
    UserLearnRecordModule,
    ToolModule,
    RankModule,
    CronJobModule,
    CourseHistoryModule,
    MembershipModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: "single",
        url: process.env.REDIS_URL,
        options: {
          password: process.env.REDIS_PASSWORD,
        },
      }),
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
