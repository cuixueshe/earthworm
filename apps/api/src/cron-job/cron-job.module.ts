import { Module } from "@nestjs/common";

import { RankService } from "../rank/rank.service";
import { UserModule } from "../user/user.module";
import { CronJobService } from "./cron-job.service";

@Module({
  imports: [UserModule],
  providers: [CronJobService, RankService],
})
export class CronJobModule {}
