import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { Role } from '@common/enums/role.enum';
import { ROLES_KEY } from '@common/constants/key.constants';

export const Roles = (...roles: Role[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
