import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

export const UncheckAuth = () => SetMetadata("uncheck", true);
export const Permissions = (...permissions: string[]) => SetMetadata("permissions", permissions);

@Injectable()
export class AuthGuard implements CanActivate {
  private jwks: any;
  constructor() {
    this.jwks = createRemoteJWKSet(new URL("/oidc/jwks", process.env.LOGTO_ENDPOINT));
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const uncheck = Reflect.getMetadata("uncheck", context.getHandler());
    const permissions = Reflect.getMetadata("permissions", context.getHandler());

    if (!token && uncheck) {
      request["userId"] = null;
    } else if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtVerify(token);

      const scopes = typeof payload.scope === "string" ? payload.scope.split(" ") : [];

      if (permissions) {
        if (!permissions.every((scope) => scopes.includes(scope))) {
          throw new UnauthorizedException();
        }
      }

      request["userId"] = payload.sub;
    } catch (e) {
      if (!uncheck) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private async jwtVerify(token) {
    const { payload } = await jwtVerify(
      // The raw Bearer Token extracted from the request header
      token,
      this.jwks,
      {
        // Expected issuer of the token, issued by the Logto server
        issuer: new URL("oidc", process.env.LOGTO_ENDPOINT).href,
        // Expected audience token, the resource indicator of the current API
        audience: process.env.BACKEND_ENDPOINT,
      },
    );

    return payload;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
