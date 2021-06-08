import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

import { AuthStatus, Role } from '@core/enums';
import { useAuthContext } from '@providers';

interface IProps extends RouteProps {
	component: React.FC<RouteComponentProps>;
	roles: Role[];
}

export const RolesGuardedRoute: React.FC<IProps> = ({ component: Component, roles, ...rest }) => {
	const { authStatus, profile } = useAuthContext();

	const render = (props: RouteComponentProps): React.ReactNode =>
		authStatus === AuthStatus.AUTHORIZED && profile && roles.includes(profile.role) ? (
			<Component {...props} />
		) : (
			<Redirect to="/" />
		);

	return <Route {...rest} render={render} />;
};
