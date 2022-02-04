import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/utils/role.enum';
import { ROLES_KEY } from 'src/utils/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<string[]>('role', context.getHandler());
        if (!requiredRole) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRole.some((role) => user.role?.includes(role));
    }
}