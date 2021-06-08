import { Role } from '@core/enums';

import { IBaseModel } from './IBaseModel';

export interface IUserModel extends IBaseModel {
	email: string;
	username: string;
	role: Role;
}
