import { Role } from '@common/enums/role.enum';

import { Todo } from '@modules/todo/entities/todo.entity';

export interface IUser {
	email: string;
	username: string;
	password: string;
	passwordChangeCode?: number;
	todo: Todo[];
	role: Role;
}
