import { Module } from "@nestjs/common";

import { LogtoService } from "./logto.service";

@Module({
  imports: [],
  providers: [LogtoService],
  exports: [LogtoService],
})
export class LogtoModule {}
