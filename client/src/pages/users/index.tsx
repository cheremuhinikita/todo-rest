import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import useStyles from './styled';

export const UsersPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography component="h1" variant="h2" className={classes.title}>
				Пользователи
			</Typography>
		</div>
	);
};
