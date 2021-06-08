import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import { NotifyContainer } from '@containers';
import { theme } from '@core/theme';
import { RootProvider } from '@providers';

import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<NotifyContainer />
			<CssBaseline />
			<Router>
				<RootProvider>
					<App />
				</RootProvider>
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
