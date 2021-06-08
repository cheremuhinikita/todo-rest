import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps extends Omit<DialogProps, 'open' | 'title'> {
	isOpen: boolean;
	title: string | null;
	onDisagre: () => void;
	onAgree: () => void;
}

export const ConfirmationDialog: React.FC<IProps> = ({
	isOpen,
	title,
	onClose,
	onDisagre,
	onAgree,
	...props
}) => (
	<Dialog
		{...props}
		open={!!title && isOpen}
		onClose={onClose}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
		<DialogActions>
			<Button onClick={onDisagre} color="primary">
				Disagree
			</Button>
			<Button onClick={onAgree} color="primary" autoFocus>
				Agree
			</Button>
		</DialogActions>
	</Dialog>
);
