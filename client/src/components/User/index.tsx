import React from 'react';

import { IUserModel } from '@core/models';

import Typography from '@material-ui/core/Typography';

import { RolesGuard } from '@core/guards';
import { Role } from '@core/enums';
import { Block } from '@components';

import useStyles from './styled';

interface IProps extends Omit<IUserModel, 'id' | 'todo'> {
	component?: React.FC;
}

export const User: React.FC<IProps> = ({
	username,
	email,
	role,
	createDate,
	updateDate,
	component: Component = Block,
}) => {
	const classes = useStyles();

	return (
		<Component>
			<Typography variant="h5" component="h2">
				{username}
			</Typography>
			<Typography className={classes.title} color="textSecondary" gutterBottom>
				{email}
			</Typography>
			<RolesGuard roles={[Role.ADMIN]}>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{`Роль: ${role}`}
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{`Дата создания: ${createDate}`}
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{`Дата обновления: ${updateDate}`}
				</Typography>
			</RolesGuard>
		</Component>
	);
};
