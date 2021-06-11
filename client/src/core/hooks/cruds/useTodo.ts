import { toast } from 'react-toastify';

import { ITodoModel } from '@core/models';
import { ICreateOrUpdateTodoForm } from '@core/schemes';
import { TodoService, todoService } from '@core/services';
import {
	MESSAGE_SUCCESS_CREATE_TODO,
	MESSAGE_SUCCESS_DELETE_TODO,
	MESSAGE_SUCCESS_UPDATE_TODO,
} from '@core/constants';

import { IUseCrudReturn, useCrud } from '../useCrud';

export const useTodo = (): IUseCrudReturn<ITodoModel, ICreateOrUpdateTodoForm> => {
	const onCreate = () => {
		toast(MESSAGE_SUCCESS_CREATE_TODO);
	};

	const onUpdate = () => {
		toast(MESSAGE_SUCCESS_UPDATE_TODO);
	};

	const onRemove = () => {
		toast(MESSAGE_SUCCESS_DELETE_TODO);
	};

	return useCrud<ITodoModel, ICreateOrUpdateTodoForm, TodoService>({
		service: todoService,
		onCreate,
		onUpdate,
		onRemove,
	});
};
