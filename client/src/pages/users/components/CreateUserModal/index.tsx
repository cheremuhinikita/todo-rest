import React from 'react';

import { DialogTitle, DialogContent } from '@material-ui/core';

import { useCrudContext } from '@providers';
import { USERS_KEY } from '@core/constants';
import { selectCrudHook } from '@core/utils/crud';

import { UserForm } from '..';

export const CreateUserModal: React.FC = () => {
	const { create } = useCrudContext(selectCrudHook(USERS_KEY));

	return (
		<>
			<DialogTitle id="form-dialog-title">Создание пользователя</DialogTitle>
			<DialogContent dividers>
				<UserForm source={create} buttonText="Создать" />
			</DialogContent>
		</>
	);
};
