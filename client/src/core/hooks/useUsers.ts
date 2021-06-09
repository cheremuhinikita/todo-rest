import { IUserModel } from '@core/models';
import { ICreateOrUpdateUserForm } from '@core/schemes';

import { Async } from './useAsync';

export interface IUseUsersReturn {
	create: (data: ICreateOrUpdateUserForm) => Promise<void>;
	findAll: () => Async<IUserModel[]>;
	findOne: (id: string) => Async<IUserModel>;
	update: (id: string, data: ICreateOrUpdateUserForm) => Promise<void>;
	delete: (id: string) => Promise<void>;
}
