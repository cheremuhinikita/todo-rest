import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthContext } from '@providers';
import { AuthStatus, PageUrls } from '@core/enums';
import { GuestGuardedRoute } from '@routes';
import { Layout } from '@containers';
import { InitialPage, LoginPage, RecoveryPasswordPage, RegisterPage, HomePage } from '@pages';

const App: React.FC = () => {
	const { checkToken, authStatus } = useAuthContext();

	React.useEffect(() => {
		checkToken();
	}, []);

	if (authStatus === AuthStatus.INITIAL) return <InitialPage />;

	return (
		<>
			<Redirect to={PageUrls.home} />
			<GuestGuardedRoute exact path={PageUrls.login} component={LoginPage} />
			<GuestGuardedRoute exact path={PageUrls.register} component={RegisterPage} />
			<GuestGuardedRoute
				exact
				path={PageUrls.recoveryPassword}
				component={RecoveryPasswordPage}
			/>
			<Route exact path={[PageUrls.home]}>
				<Layout>
					<Route exact path={PageUrls.home} component={HomePage} />
				</Layout>
			</Route>
		</>
	);
};

export default App;
