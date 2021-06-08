import { USER_CONTEXT_KEY } from '@common/constants/key.constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserContext = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const user = request[USER_CONTEXT_KEY];

	return data ? user?.[data] : user;
});
