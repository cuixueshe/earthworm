import { Module } from "@nestjs/common";

import { UserModule } from "../user/user.module";
import { RankController } from "./rank.controller";
import { RankService } from "./rank.service";

@Module({
  imports: [UserModule],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
