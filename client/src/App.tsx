import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useAuthContext } from '@providers';
import { AuthStatus, PageUrls } from '@core/enums';
import { GuestGuardedRoute } from '@routes';
import { Layout } from '@containers';
import {
	InitialPage,
	LoginPage,
	RecoveryPasswordPage,
	RegisterPage,
	HomePage,
	UsersPage,
	ErrorPage,
} from '@pages';
import { makeParam, makeUrl } from '@core/utils';
import { ERROR_CODE_KEY } from '@core/constants';

const App: React.FC = () => {
	const { checkToken, authStatus } = useAuthContext();

	React.useEffect(() => {
		checkToken();
	}, []);

	if (authStatus === AuthStatus.INITIAL) return <InitialPage />;

	return (
		<Switch>
			<GuestGuardedRoute exact path={PageUrls.login} component={LoginPage} />
			<GuestGuardedRoute exact path={PageUrls.register} component={RegisterPage} />
			<GuestGuardedRoute
				exact
				path={PageUrls.recoveryPassword}
				component={RecoveryPasswordPage}
			/>
			<Route
				exact
				path={makeUrl(PageUrls.error, makeParam(ERROR_CODE_KEY))}
				component={ErrorPage}
			/>
			<Route path={[PageUrls.home, PageUrls.users]}>
				<Layout>
					<Route exact path={PageUrls.home} component={HomePage} />
					<Route path={PageUrls.users} component={UsersPage} />
				</Layout>
			</Route>
			<Redirect to={PageUrls.home} />
		</Switch>
	);
};

export default App;
