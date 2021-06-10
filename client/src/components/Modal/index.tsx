import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';

interface IProps extends Omit<DialogProps, 'open' | 'onClose'> {
	children: React.ReactNode;
	path: string;
}

export const Modal: React.FC<IProps> = ({ children, path, ...props }) => {
	const history = useHistory();

	return (
		<Route path={path}>
			{({ match }) => (
				<Dialog {...props} open={Boolean(match)} onClose={history.goBack}>
					{Boolean(match) && children}
				</Dialog>
			)}
		</Route>
	);
};
