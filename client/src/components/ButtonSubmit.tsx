import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface IProps extends Omit<ButtonProps, 'type'> {
	isLoading: boolean;
	circularColor?: 'primary' | 'secondary' | 'inherit';
	circularSize?: number;
}

export const ButtonSubmit: React.FC<IProps> = ({
	isLoading,
	circularColor = 'inherit',
	circularSize = 24,
	children,
	...otherProps
}) => (
	<Button {...otherProps} type="submit">
		<div>
			{isLoading ? <CircularProgress color={circularColor} size={circularSize} /> : children}
		</div>
	</Button>
);
