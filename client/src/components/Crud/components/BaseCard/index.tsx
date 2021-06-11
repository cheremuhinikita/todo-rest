import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { useConfirmDialogContext } from '@providers';
import { RolesGuard } from '@core/guards';
import { ModalUrls } from '@core/enums';
import { IBaseAddActionsProps, IBaseCardProps } from '@core/interfaces';
import { makeUrlModal } from '@core/utils';
import { IBaseModel } from '@core/models';
import { Actions } from '@core/types';
import { MESSAGE_QUESTION_DELETE } from '@core/constants';

import useStyles from './styled';

interface IProps<T extends IBaseModel> {
	id: number;
	model: T;
	actions: Actions;
	component: React.FC<IBaseCardProps<T>>;
	addActions?: React.FC<IBaseAddActionsProps<T>>;
	onRemove: (id: number) => Promise<void>;
}

export function BaseCard<T extends IBaseModel>({
	id,
	model,
	actions,
	component: Component,
	addActions: AddActions,
	onRemove,
}: IProps<T>): React.ReactElement {
	const classes = useStyles();
	const confirmDialog = useConfirmDialogContext();

	const handleRemove = (): void => {
		const onAgree = () => onRemove(id);

		confirmDialog(MESSAGE_QUESTION_DELETE, {
			onAgree,
		});
	};

	return (
		<Card className={classes.root}>
			<Component component={CardContent} model={model} />
			<Divider />
			<CardActions>
				{AddActions && <AddActions model={model} />}
				<RolesGuard roles={actions.update}>
					<Button
						size="small"
						variant="contained"
						component={RouterLink}
						to={makeUrlModal(id.toString(), ModalUrls.update)}
					>
						Изменить
					</Button>
				</RolesGuard>
				<RolesGuard roles={actions.delete}>
					<Button size="small" variant="text" onClick={handleRemove}>
						Удалить
					</Button>
				</RolesGuard>
			</CardActions>
		</Card>
	);
}
