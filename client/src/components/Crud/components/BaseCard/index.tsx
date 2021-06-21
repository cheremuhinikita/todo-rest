import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useConfirmDialogContext, useCrudContext } from '@providers';
import { RolesGuard } from '@core/guards';
import { ModalUrls } from '@core/enums';
import { IBaseAddActionsProps, IBaseCardProps, ICrudContext } from '@core/interfaces';
import { makeUrlModal, selectCrudHook } from '@core/utils';
import { IBaseModel } from '@core/models';
import { Actions } from '@core/types';
import { MESSAGE_QUESTION_DELETE } from '@core/constants';

import useStyles from './styled';

interface IProps<T extends IBaseModel> {
	id: number;
	hookKey: keyof ICrudContext;
	model: T;
	actions: Actions;
	component: React.FC<IBaseCardProps<T>>;
	addActions?: React.FC<IBaseAddActionsProps<T>>;
}

export function BaseCard<T extends IBaseModel>({
	id,
	hookKey,
	model,
	actions,
	component: Component,
	addActions: AddActions,
}: IProps<T>): React.ReactElement {
	const classes = useStyles();
	const [isRemove, setIsRemove] = React.useState<boolean>(false);

	const confirmDialog = useConfirmDialogContext();
	const {
		remove: { execute, loading },
	} = useCrudContext(selectCrudHook(hookKey));

	const handleRemove = (): void => {
		const onAgree = () => {
			setIsRemove(true);
			execute(id);
		};

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
						{isRemove && loading ? <CircularProgress size={24} /> : 'Изменить'}
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
