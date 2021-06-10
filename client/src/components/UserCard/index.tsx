import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { IUserModel } from '@core/models';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { User } from '@components';
import { RolesGuard } from '@core/guards';
import { ModalUrls, Role } from '@core/enums';

import { makeUrlModal } from '@core/utils';
import { Divider } from '@material-ui/core';
import useStyles from './styled';

interface IProps extends IUserModel {
	onRemove: (id: number) => Promise<void>;
}

export const UserCard: React.FC<IProps> = ({ id, todo, onRemove, ...user }) => {
	const classes = useStyles();

	const handleRemove = (): void => {
		onRemove(id);
	};

	return (
		<Card className={classes.root}>
			<User {...user} component={CardContent} />
			<Divider />
			<CardActions>
				<Button
					size="small"
					disabled={todo.length === 0}
					component={RouterLink}
					to={makeUrlModal(id.toString(), ModalUrls.listTodo)}
				>
					ToDo
				</Button>
				<RolesGuard roles={[Role.ADMIN]}>
					<Button
						size="small"
						variant="contained"
						component={RouterLink}
						to={makeUrlModal(id.toString(), ModalUrls.update)}
					>
						Изменить
					</Button>
					<Button size="small" variant="text" onClick={handleRemove}>
						Удалить
					</Button>
				</RolesGuard>
			</CardActions>
		</Card>
	);
};
