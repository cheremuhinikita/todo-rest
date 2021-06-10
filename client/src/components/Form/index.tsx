import React from 'react';

import { useConfirmDialogContext } from '@providers';
import { MESSAGE_QUESTION_CREATE } from '@core/constants';

interface IProps
	extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	onSubmit: () => Promise<void>;
}

export const Form: React.FC<IProps> = ({ children, onSubmit, ...props }) => {
	const confirmDialog = useConfirmDialogContext();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		confirmDialog(MESSAGE_QUESTION_CREATE, {
			onAgree: onSubmit,
		});
	};

	return (
		<form {...props} noValidate onSubmit={handleSubmit}>
			{children}
		</form>
	);
};
