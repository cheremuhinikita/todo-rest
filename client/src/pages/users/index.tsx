import React from 'react';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useCrudContext } from '@providers';
import { selectCrudHook } from '@core/utils/crud';
import { ID_KEY, USERS_KEY } from '@core/constants';
import {
	Async,
	CreateUserModal,
	Modal,
	TodoListModal,
	UpdateUserModal,
	UserCard,
} from '@components';
import { PageUrls, ModalUrls, Role } from '@core/enums';
import { makeUrl, makeParam } from '@core/utils';

import { RolesGuard } from '@core/guards';
import useStyles from './styled';

export const UsersPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const {
		findAll: { execute, data, loading, error },
		remove,
	} = useCrudContext(selectCrudHook(USERS_KEY));

	React.useEffect(() => {
		execute();
	}, []);

	const path = makeUrl(PageUrls.users, makeParam(ID_KEY), ModalUrls.listTodo);
	const pathCreate = makeUrl(PageUrls.users, ModalUrls.create);
	const pathUpdate = makeUrl(PageUrls.users, makeParam(ID_KEY), ModalUrls.update);

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Typography component="h1" variant="h2" className={classes.title}>
					Пользователи
				</Typography>
				<RolesGuard roles={[Role.ADMIN]}>
					<Button size="small" variant="contained" component={RouterLink} to={pathCreate}>
						Создать
					</Button>
				</RolesGuard>
			</div>
			<Async data={data} loading={loading} error={error} className={classes.wrapper}>
				{data &&
					data.map(({ id, ...user }) => (
						<UserCard key={id} id={id} onRemove={remove} {...user} />
					))}
			</Async>
			<Modal
				scroll="paper"
				path={path}
				classes={{
					paper: classes.paper,
				}}
			>
				<TodoListModal />
			</Modal>
			<RolesGuard roles={[Role.ADMIN]}>
				<Modal
					scroll="paper"
					path={pathCreate}
					classes={{
						paper: classes.paper,
					}}
				>
					<CreateUserModal />
				</Modal>
				<Modal
					scroll="paper"
					path={pathUpdate}
					classes={{
						paper: classes.paper,
					}}
				>
					<UpdateUserModal />
				</Modal>
			</RolesGuard>
		</div>
	);
};
