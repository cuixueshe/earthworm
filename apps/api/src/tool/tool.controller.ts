import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ToolService } from "./tool.service";

@ApiTags("Tool")
@Controller("tool")
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @ApiOperation({
    summary: "生成课程打卡图",
  })
  @Get("dailySentence")
  dailySentence() {
    return this.toolService.dailySentence();
  }
}
