import React from 'react';

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import MuiLink, { LinkProps as MuiProps } from '@material-ui/core/Link';

import { PageUrls } from '@core/enums';

type IProps = RouterLinkProps &
	MuiProps & {
		to: PageUrls;
	};

export const Link: React.FC<IProps> = ({ children, ...otherProps }) => (
	<MuiLink {...otherProps} component={RouterLink}>
		{children}
	</MuiLink>
);
