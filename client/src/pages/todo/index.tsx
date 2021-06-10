import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Crud, Todo } from '@components';
import { TODO_KEY } from '@core/constants';
import { Actions } from '@core/types/crud';
import { Manipulations, PageUrls, Role } from '@core/enums';
import { TodoForm } from './components';

export const TodoPage: React.FC<RouteComponentProps> = () => {
	const actions: Actions = {
		[Manipulations.CREATE]: [Role.USER],
		[Manipulations.READ]: [Role.USER],
		[Manipulations.UPDATE]: [Role.USER],
		[Manipulations.DELETE]: [Role.USER],
	};

	return (
		<Crud
			title="ToDo"
			hookKey={TODO_KEY}
			card={Todo}
			form={TodoForm}
			actions={actions}
			pageUrl={PageUrls.todo}
		/>
	);
};
