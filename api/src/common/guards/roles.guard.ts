import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '@common/enums/role.enum';
import { ROLES_KEY, USER_CONTEXT_KEY } from '@common/constants/key.constants';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!roles) {
			return true;
		}

		const req = context.switchToHttp().getRequest();
		const user = req[USER_CONTEXT_KEY];

		return roles.includes(user.role);
	}
}
