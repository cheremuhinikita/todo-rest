import { Role } from '@core/enums';

import { IBaseModel } from './IBaseModel';
import { ITodoModel } from './ITodoModel';

export interface IUserModel extends IBaseModel {
	email: string;
	username: string;
	password: string;
	role: Role;
	todo: ITodoModel[];
}
