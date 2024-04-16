import { createParamDecorator, ExecutionContext } from "@nestjs/common";

type User = {
  userId: string;
};
export type UserEntity = User | null;

export const User: () => ParameterDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      userId: request.userId,
    };
  },
);
