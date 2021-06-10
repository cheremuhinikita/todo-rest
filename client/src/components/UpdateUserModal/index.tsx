import React from 'react';
import { useParams } from 'react-router-dom';

import { Async, UserForm } from '@components';
import { ID_KEY, USERS_KEY } from '@core/constants';
import { selectCrudHook } from '@core/utils/crud';
import { DialogTitle, DialogContent } from '@material-ui/core';
import { useCrudContext } from '@providers';
import { ICreateOrUpdateUserForm } from '@core/schemes';

interface IParams {
	[ID_KEY]: string;
}

export const UpdateUserModal: React.FC = () => {
	const {
		update,
		findOne: { execute, data, loading, error },
	} = useCrudContext(selectCrudHook(USERS_KEY));

	const { id } = useParams<IParams>();
	const source = (formValues: ICreateOrUpdateUserForm) => update(Number(id), formValues);

	React.useEffect(() => {
		execute(Number(id));
	}, []);

	const transformDefaultValues = (result: typeof data): Partial<ICreateOrUpdateUserForm> => ({
		email: result?.email,
		username: result?.username,
		password: result?.password,
		role: result?.role,
	});

	return (
		<>
			<DialogTitle id="form-dialog-title">Изменение пользователя</DialogTitle>
			<DialogContent dividers>
				<Async data={data} loading={loading} error={error}>
					{data && !loading && (
						<UserForm
							source={source}
							defaultValues={transformDefaultValues(data)}
							buttonText="Изменить"
						/>
					)}
				</Async>
			</DialogContent>
		</>
	);
};
