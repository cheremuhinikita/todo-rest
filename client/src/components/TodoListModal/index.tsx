import React from 'react';
import { useParams } from 'react-router-dom';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';

import { Async, Todo } from '@components';
import { ID_KEY, USERS_KEY } from '@core/constants';
import { selectCrudHook } from '@core/utils/crud';
import { useCrudContext } from '@providers';

interface IParams {
	[ID_KEY]: string;
}

export const TodoListModal: React.FC = () => {
	const {
		findTodo: { execute, data, loading, error },
	} = useCrudContext(selectCrudHook(USERS_KEY));

	const { id } = useParams<IParams>();

	React.useEffect(() => {
		execute(Number(id));
	}, []);

	return (
		<Async data={data} loading={loading} error={error}>
			<DialogTitle id="form-dialog-title">ToDo</DialogTitle>
			<DialogContent dividers>
				<List>
					{data &&
						data.map(({ id: todoId, ...todoItem }) => (
							<Todo key={todoId} {...todoItem} />
						))}
				</List>
			</DialogContent>
		</Async>
	);
};
