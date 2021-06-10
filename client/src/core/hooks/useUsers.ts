import { useHistory } from 'react-router-dom';

import { IAsync } from '@core/interfaces';
import { ITodoModel, IUserModel } from '@core/models';
import { ICreateOrUpdateUserForm } from '@core/schemes';
import { UsersService, usersService } from '@core/services';

import { useAsync } from './useAsync';

import { IUseCrudReturn, useCrud } from './useCrud';

export interface IUseUsersReturn extends IUseCrudReturn<IUserModel, ICreateOrUpdateUserForm> {
	findTodo: IAsync<ITodoModel[]>;
}

export const useUsers = (): IUseUsersReturn => {
	const history = useHistory();

	const onCreate = () => {
		history.goBack();
	};

	const onUpdate = () => {
		history.goBack();
	};

	const crud = useCrud<IUserModel, ICreateOrUpdateUserForm, UsersService>({
		service: usersService,
		onCreate,
		onUpdate,
	});

	const findTodo = useAsync((id: number) => usersService.findTodo(id));

	return {
		findTodo,
		...crud,
	};
};
