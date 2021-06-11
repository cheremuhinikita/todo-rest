import React from 'react';
import { useHistory } from 'react-router-dom';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { useCrudContext } from '@providers';
import { selectCrudHook } from '@core/utils/crud';
import { ICrudContext, IBaseFormProps } from '@core/interfaces';
import { MESSAGE_QUESTION_CREATE } from '@core/constants';

interface IProps<T extends Record<string, string>> {
	hookKey: keyof ICrudContext;
	form: React.FC<IBaseFormProps<T>>;
}

export function BaseCreateModal<T extends Record<string, string>>({
	hookKey,
	form: Form,
}: IProps<T>): React.ReactElement {
	const history = useHistory();
	const { create } = useCrudContext(selectCrudHook(hookKey));

	const handleCreate = async (data: T): Promise<void> => {
		await (create as unknown as (data: T) => Promise<void>)(data);
		history.goBack();
	};

	return (
		<>
			<DialogTitle>Создание</DialogTitle>
			<DialogContent dividers>
				<Form
					source={handleCreate}
					buttonText="Создать"
					confirmQuestion={MESSAGE_QUESTION_CREATE}
				/>
			</DialogContent>
		</>
	);
}
