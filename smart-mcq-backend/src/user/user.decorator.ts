
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserPrincipal } from './user.principal';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.user)
            throw new UnauthorizedException();
        return request.user as UserPrincipal;
    },
);
