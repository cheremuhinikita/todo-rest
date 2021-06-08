import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { IconButton, Menu, Typography, Divider, MenuItem, Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { useAuthContext } from '@providers';

import { AuthStatus, PageUrls } from '@core/enums';
import { useMenuState } from '@core/hooks';

import useStyles from './styled';

export const Profile: React.FC = () => {
	const classes = useStyles();
	const { authStatus, profile, logout } = useAuthContext();
	const { anchorEl, isMenuOpen, handleMenuOpen, handleMenuClose } = useMenuState();

	const handleLogout = (): void => {
		logout();
		handleMenuClose();
	};

	const menuId = 'primary-search-account-menu';

	return authStatus === AuthStatus.AUTHORIZED && profile ? (
		<div>
			<IconButton
				edge="end"
				aria-label="account of current user"
				aria-controls={menuId}
				aria-haspopup="true"
				onClick={handleMenuOpen}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				keepMounted
				id={menuId}
				open={isMenuOpen}
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				onClose={handleMenuClose}
			>
				<div className={classes.menuProfile}>
					<Typography variant="h6" className={classes.menuProfileUsername}>
						{profile.username}
					</Typography>
					<Typography variant="h6" className={classes.menuProfileEmail}>
						{profile.email}
					</Typography>
				</div>
				<Divider />
				<MenuItem onClick={handleLogout}>Выйти из уч. записи</MenuItem>
			</Menu>
		</div>
	) : (
		<Button color="inherit" component={RouterLink} to={PageUrls.login}>
			Войти
		</Button>
	);
};
