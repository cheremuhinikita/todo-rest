import { ITodoModel } from '@core/models';
import { ICreateOrUpdateTodoForm } from '@core/schemes';

import { BaseCrudService } from './BaseCrudService';

const ROUTE = 'todo';

export class TodoService extends BaseCrudService<ITodoModel, ICreateOrUpdateTodoForm> {
	constructor() {
		super(ROUTE);
	}
}

export const todoService = new TodoService();
