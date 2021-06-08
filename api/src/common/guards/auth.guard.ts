import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { USER_CONTEXT_KEY } from '@common/constants/key.constants';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest();

		return Boolean(req[USER_CONTEXT_KEY]);
	}
}
