import { IBaseModel } from './IBaseModel';
import { IUserModel } from './IUserModel';

export interface ITodoModel extends IBaseModel {
	title: string;
	description: string;
	user: IUserModel;
}
