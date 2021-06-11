import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Crud, Todo } from '@components';
import { TODO_KEY } from '@core/constants';
import { Actions } from '@core/types/crud';
import { Manipulations, PageUrls, Role } from '@core/enums';
import { ITodoModel } from '@core/models';
import { ICreateOrUpdateTodoForm } from '@core/schemes';

import { TodoForm } from './components';

const actions: Actions = {
	[Manipulations.CREATE]: [Role.USER],
	[Manipulations.READ]: [Role.USER],
	[Manipulations.UPDATE]: [Role.USER],
	[Manipulations.DELETE]: [Role.USER],
};

const transformValues = (data: ITodoModel): Partial<ICreateOrUpdateTodoForm> => ({
	title: data.title,
	description: data.description,
});

export const TodoPage: React.FC<RouteComponentProps> = () => (
	<Crud
		title="ToDo"
		hookKey={TODO_KEY}
		actions={actions}
		pageUrl={PageUrls.todo}
		transformValues={transformValues}
		card={Todo}
		form={TodoForm}
	/>
);
