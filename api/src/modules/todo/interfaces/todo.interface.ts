import { User } from '@modules/users/entities/user.entity';

export interface ITodo {
	title: string;
	description: string;
	user: User;
}
