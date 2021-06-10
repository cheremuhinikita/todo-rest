import api from '@core/api';

import { ITodoModel, IUserModel } from '@core/models';
import { ICreateOrUpdateUserForm } from '@core/schemes';

import { BaseCrudService } from './BaseCrudService';

const ROUTE = 'users';

export class UsersService extends BaseCrudService<IUserModel, ICreateOrUpdateUserForm> {
	constructor() {
		super(ROUTE);
	}

	public async findTodo(id: number): Promise<ITodoModel[]> {
		const { data } = await api.get<ITodoModel[]>(`${ROUTE}/${id}/todo`);
		return data;
	}
}

export const usersService = new UsersService();
