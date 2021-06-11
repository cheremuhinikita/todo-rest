import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Crud, Modal, User } from '@components';
import { Manipulations, ModalUrls, PageUrls, Role } from '@core/enums';
import { Actions } from '@core/types';
import { makeParam, makeUrl } from '@core/utils';
import { ID_KEY, USERS_KEY } from '@core/constants';

import { IUserModel } from '@core/models';
import { ICreateOrUpdateUserForm } from '@core/schemes';
import { TodoListModal, UserAddActions, UserForm } from './components';
import useStyles from './styled';

const actions: Actions = {
	[Manipulations.CREATE]: [Role.ADMIN],
	[Manipulations.READ]: [],
	[Manipulations.UPDATE]: [Role.ADMIN],
	[Manipulations.DELETE]: [Role.ADMIN],
};

const transformValues = (data: IUserModel): Partial<ICreateOrUpdateUserForm> => ({
	email: data.email,
	username: data.username,
	role: data.role,
});

export const UsersPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const path = makeUrl(PageUrls.users, makeParam(ID_KEY), ModalUrls.listTodo);

	return (
		<Crud
			title="Пользователи"
			hookKey={USERS_KEY}
			actions={actions}
			pageUrl={PageUrls.users}
			transformValues={transformValues}
			card={User}
			form={UserForm}
			addActions={UserAddActions}
		>
			<Modal
				scroll="paper"
				path={path}
				classes={{
					paper: classes.paper,
				}}
			>
				<TodoListModal />
			</Modal>
		</Crud>
	);
};
