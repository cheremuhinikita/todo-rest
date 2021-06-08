import { Role } from '@common/enums/role.enum';

import { IUser } from '@modules/users/interfaces/user.interface';

export const DATA_USERS: IUser[] = [
	{
		email: 'admin@gmail.com',
		username: 'admin',
		password: 'qwerty',
		todo: [],
		role: Role.ADMIN,
	},
	{
		email: 'user@gmail.com',
		username: 'user',
		password: 'qwerty',
		todo: [],
		role: Role.USER,
	},
];
