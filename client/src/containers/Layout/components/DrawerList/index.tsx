import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { PageUrls } from '@core/enums';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Dashboard';
import UsersIcon from '@material-ui/icons/Group';

import useStyles from './styled';

export const DrawerList: React.FC = () => {
	const classes = useStyles();

	return (
		<List>
			<ListItem button component={RouterLink} to={PageUrls.home}>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText
					primary="Главная"
					color="secondary"
					className={classes.listItemText}
				/>
			</ListItem>
			<ListItem button component={RouterLink} to={PageUrls.users}>
				<ListItemIcon>
					<UsersIcon />
				</ListItemIcon>
				<ListItemText
					primary="Пользователи"
					color="secondary"
					className={classes.listItemText}
				/>
			</ListItem>
		</List>
	);
};
