import { User } from '@modules/users/entities/user.entity';

export interface ILoginResponse {
	token: string;
	profile: User;
}
