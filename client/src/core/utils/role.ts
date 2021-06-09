import { AuthStatus, Role } from '@core/enums';
import { IUserModel } from '@core/models';
import { Nullable } from '@core/types';

export const checkRole = (
	authStatus: AuthStatus,
	profile: Nullable<IUserModel>,
	roles: Role[],
): boolean =>
	authStatus === AuthStatus.AUTHORIZED && profile !== null && roles.includes(profile.role);
