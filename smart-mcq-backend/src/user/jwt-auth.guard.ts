import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.isPublic(context);
        if (isPublic) return true;

        const canActivate = super.canActivate(context);
        return canActivate && this.isInRole(context);
    }

    private isPublic(context: ExecutionContext) {
        return this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
    }

    private isInRole(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles)
            return true;

        const { user } = context.switchToHttp().getRequest();
        //BUG! For roles, we must ensure that this annotation is used
        //explicitly.
        return !user || requiredRoles.some((role) => user?.role === role);
    }

}
