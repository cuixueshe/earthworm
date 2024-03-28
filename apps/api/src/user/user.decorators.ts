import { ExecutionContext, createParamDecorator } from '@nestjs/common';

type User = {
  userId: number;
  username: string;
  nickname: string;
  phone?: string;
};
export type UserEntity = User | null;

export const User: () => ParameterDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
