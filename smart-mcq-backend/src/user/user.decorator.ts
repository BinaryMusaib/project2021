
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPrincipal } from './user.principal';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as UserPrincipal;
    },
);
