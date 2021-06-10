import React from 'react';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useCrudContext } from '@providers';
import { Async, Modal } from '@components';
import { selectCrudHook } from '@core/utils/crud';
import { ID_KEY, USERS_KEY } from '@core/constants';
import { PageUrls, ModalUrls, Role } from '@core/enums';
import { makeUrl, makeParam } from '@core/utils';
import { RolesGuard } from '@core/guards';

import { CreateUserModal, TodoListModal, UpdateUserModal, UserCard } from './components';
import useStyles from './styled';

export const UsersPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const {
		findAll: { data, ...restFindAll },
		remove,
	} = useCrudContext(selectCrudHook(USERS_KEY));

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
			<Async {...restFindAll} data={data} className={classes.wrapper}>
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
