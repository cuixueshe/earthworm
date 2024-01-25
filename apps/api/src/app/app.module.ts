import { Module } from '@nestjs/common';
import { GlobalModule } from '../global/global.mudule';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [GlobalModule, UserModule, AuthModule, CourseModule],
})
export class AppModule {}
