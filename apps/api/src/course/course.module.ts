import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { GlobalModule } from '../global/global.mudule';

@Module({
  imports: [GlobalModule],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
