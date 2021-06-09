import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import { useCrudContext } from '@providers';

import useStyles from './styled';

export const UsersPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const { execute } = useCrudContext((context) => context.users().findAll);

	React.useEffect(() => {
		execute();
	}, []);

	return (
		<div className={classes.root}>
			<Typography component="h1" variant="h2" className={classes.title}>
				Пользователи
			</Typography>
		</div>
	);
};
