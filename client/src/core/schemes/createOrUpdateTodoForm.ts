import * as Yup from 'yup';

export interface ICreateOrUpdateTodoForm extends Record<string, string> {
	title: string;
	description: string;
}

export const createOrUpdateTodoFormSchema: Yup.SchemaOf<ICreateOrUpdateTodoForm> = Yup.object()
	.shape({
		title: Yup.string()
			.required('Это обязательное поле')
			.min(6, 'Мин кол-во символов 6')
			.max(32, 'Макс кол-во символов 32'),
		description: Yup.string().required('Это обязательное поле'),
	})
	.defined();
