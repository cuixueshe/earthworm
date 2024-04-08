import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PubAchievementGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const secretKey = request.body.secretKey; // 获取请求体中的密钥值
    const compareKey = process.env.PubsecretKey; // 获取环境变量中的密钥值
    // 在这里进行密钥验证逻辑
    if (secretKey === compareKey) {
      return true; // 密钥验证通过，允许使用功能
    } else {
      return false; // 密钥验证失败，禁止使用功能
    }
  }
}
