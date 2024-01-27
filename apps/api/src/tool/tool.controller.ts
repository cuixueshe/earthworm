import { Controller, Get } from '@nestjs/common';
import { ToolService } from './tool.service';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get('dailySentence')
  dailySentence() {
    return this.toolService.dailySentence();
  }
}
