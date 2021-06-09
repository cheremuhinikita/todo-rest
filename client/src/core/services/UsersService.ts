import { IUserModel } from '@core/models';
import { ICreateOrUpdateUserForm } from '@core/schemes';

import { BaseCrudService } from './BaseCrudService';

export class UsersService extends BaseCrudService<IUserModel, ICreateOrUpdateUserForm> {
	constructor() {
		super('users');
	}
}
