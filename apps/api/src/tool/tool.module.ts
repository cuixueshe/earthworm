import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';

@Module({
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
