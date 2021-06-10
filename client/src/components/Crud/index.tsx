import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useCrudContext } from '@providers';
import { Async, Modal } from '@components';
import { makeUrl, selectCrudHook } from '@core/utils';
import { IBaseCardProps, IBaseFormProps, ICrudContext } from '@core/interfaces';
import { IBaseModel } from '@core/models';
import { Actions } from '@core/types/crud';
import { RolesGuard } from '@core/guards';
import { ModalUrls, PageUrls } from '@core/enums';

import useStyles from './styled';
import { BaseCard, BaseCreateModal } from './components';

interface IProps<T extends IBaseModel, U extends Record<string, string>> {
	title: string;
	hookKey: keyof ICrudContext;
	card: React.FC<IBaseCardProps<T>>;
	form: React.FC<IBaseFormProps<U>>;
	actions: Actions;
	pageUrl: PageUrls;
}

export function Crud<T extends IBaseModel, U extends Record<string, string>>({
	title,
	hookKey,
	card: Card,
	form: Form,
	actions,
	pageUrl,
}: IProps<T, U>): React.ReactElement {
	const classes = useStyles();
	const {
		findAll: { data, ...restFindAll },
		remove,
	} = useCrudContext(selectCrudHook(hookKey));

	const pathCreate = makeUrl(pageUrl, ModalUrls.create);

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Typography component="h1" variant="h2" className={classes.title}>
					{title}
				</Typography>
				<RolesGuard roles={actions.create}>
					<Button size="small" variant="contained" component={RouterLink} to={pathCreate}>
						Создать
					</Button>
				</RolesGuard>
			</div>
			<RolesGuard roles={actions.read}>
				<Async {...restFindAll} data={data} className={classes.wrapper}>
					{data &&
						(data as unknown as T[]).map((model) => (
							<BaseCard
								key={model.id}
								id={model.id}
								model={model}
								component={Card}
								onRemove={remove}
								updateRoles={actions.update}
								removeRoles={actions.delete}
							/>
						))}
				</Async>
			</RolesGuard>
			<RolesGuard roles={actions.create}>
				<Modal
					scroll="paper"
					path={pathCreate}
					classes={{
						paper: classes.paper,
					}}
				>
					<BaseCreateModal hookKey={hookKey} form={Form} />
				</Modal>
			</RolesGuard>
		</div>
	);
}
