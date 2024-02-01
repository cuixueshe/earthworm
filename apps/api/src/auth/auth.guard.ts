import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export const UncheckAuth = () => SetMetadata('uncheck', true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const uncheck = Reflect.getMetadata('uncheck', context.getHandler());
    if (!token && uncheck) {
      request['user'] = null;
    } else if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.parseToken(token, uncheck);
    if (user) request['user'] = user;
    return true;
  }

  async parseToken(token: string, uncheck = false) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      return payload;
    } catch {
      if (!uncheck) {
        throw new UnauthorizedException();
      }
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
