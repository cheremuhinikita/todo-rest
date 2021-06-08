import { Role } from '@common/enums/role.enum';
import { AuthGuard } from '@common/guards/auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

import { Roles } from './roles.decorator';

export const Auth = (...roles: Role[]): ClassDecorator & MethodDecorator =>
	applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
