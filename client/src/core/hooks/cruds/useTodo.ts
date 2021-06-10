import { useHistory } from 'react-router-dom';

import { ITodoModel } from '@core/models';
import { ICreateOrUpdateTodoForm } from '@core/schemes';
import { TodoService, todoService } from '@core/services';

import { IUseCrudReturn, useCrud } from '../useCrud';

export const useTodo = (): IUseCrudReturn<ITodoModel, ICreateOrUpdateTodoForm> => {
	const history = useHistory();

	const onCreate = () => {
		history.goBack();
	};

	const onUpdate = () => {
		history.goBack();
	};

	return useCrud<ITodoModel, ICreateOrUpdateTodoForm, TodoService>({
		service: todoService,
		onCreate,
		onUpdate,
	});
};
