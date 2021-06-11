import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { IBaseAddActionsProps } from '@core/interfaces';
import { IUserModel } from '@core/models';
import { makeUrlModal } from '@core/utils';
import { ModalUrls } from '@core/enums';

type Props = IBaseAddActionsProps<IUserModel>;

export const UserAddActions: React.FC<Props> = ({ model: { id, todo } }) => (
	<Button
		size="small"
		disabled={todo.length === 0}
		component={RouterLink}
		to={makeUrlModal(id.toString(), ModalUrls.listTodo)}
	>
		ToDo
	</Button>
);
