import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { useCrudContext } from '@providers';
import { selectCrudHook } from '@core/utils/crud';
import { ICrudContext, IBaseFormProps } from '@core/interfaces';

interface IProps<T extends Record<string, string>> {
	hookKey: keyof ICrudContext;
	form: React.FC<IBaseFormProps<T>>;
}

export function BaseCreateModal<T extends Record<string, string>>({
	hookKey,
	form: Form,
}: IProps<T>): React.ReactElement {
	const { create } = useCrudContext(selectCrudHook(hookKey));

	return (
		<>
			<DialogTitle>Создание</DialogTitle>
			<DialogContent dividers>
				<Form source={create as unknown as (data: T) => void} buttonText="Создать" />
			</DialogContent>
		</>
	);
}
