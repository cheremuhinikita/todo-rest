import { toast } from 'react-toastify';

import { IAsync } from '@core/interfaces';
import { ITodoModel, IUserModel } from '@core/models';
import { ICreateOrUpdateUserForm } from '@core/schemes';
import { UsersService, usersService } from '@core/services';

import {
	MESSAGE_SUCCESS_CREATE_USER,
	MESSAGE_SUCCESS_DELETE_USER,
	MESSAGE_SUCCESS_UPDATE_USER,
} from '@core/constants';
import { useAsync } from '../useAsync';
import { IUseCrudReturn, useCrud } from '../useCrud';

export interface IUseUsersReturn extends IUseCrudReturn<IUserModel, ICreateOrUpdateUserForm> {
	findTodo: IAsync<ITodoModel[]>;
}

export const useUsers = (): IUseUsersReturn => {
	const onCreate = () => {
		toast(MESSAGE_SUCCESS_CREATE_USER);
	};

	const onUpdate = () => {
		toast(MESSAGE_SUCCESS_UPDATE_USER);
	};

	const onRemove = () => {
		toast(MESSAGE_SUCCESS_DELETE_USER);
	};

	const crud = useCrud<IUserModel, ICreateOrUpdateUserForm, UsersService>({
		service: usersService,
		onCreate,
		onUpdate,
		onRemove,
	});

	const findTodo = useAsync((id: number) => usersService.findTodo(id));

	return {
		findTodo,
		...crud,
	};
};
