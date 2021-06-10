import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { RolesGuard } from '@core/guards';
import { ModalUrls, Role } from '@core/enums';
import { IBaseCardProps } from '@core/interfaces';

import { makeUrlModal } from '@core/utils';

import { IBaseModel } from '@core/models';

import useStyles from './styled';

interface IProps<T extends IBaseModel> {
	id: number;
	model: T;
	component: React.FC<IBaseCardProps<T>>;
	updateRoles: Role[];
	removeRoles: Role[];
	onRemove: (id: number) => Promise<void>;
}

export function BaseCard<T extends IBaseModel>({
	id,
	model,
	component: Component,
	updateRoles,
	removeRoles,
	onRemove,
}: IProps<T>): React.ReactElement {
	const classes = useStyles();

	const handleRemove = (): void => {
		onRemove(id);
	};

	return (
		<Card className={classes.root}>
			<Component component={CardContent} model={model} />
			<Divider />
			<CardActions>
				<RolesGuard roles={updateRoles}>
					<Button
						size="small"
						variant="contained"
						component={RouterLink}
						to={makeUrlModal(id.toString(), ModalUrls.update)}
					>
						Изменить
					</Button>
				</RolesGuard>
				<RolesGuard roles={removeRoles}>
					<Button size="small" variant="text" onClick={handleRemove}>
						Удалить
					</Button>
				</RolesGuard>
			</CardActions>
		</Card>
	);
}
