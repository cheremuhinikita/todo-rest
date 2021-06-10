import * as Yup from 'yup';

export interface ILoginForm extends Record<string, string> {
	username: string;
	password: string;
}

export const loginFormSchema: Yup.SchemaOf<ILoginForm> = Yup.object()
	.shape({
		username: Yup.string()
			.required('Это обязательное поле')
			.min(2, 'Мин кол-во символов 2')
			.max(32, 'Макс кол-во символов 32'),
		password: Yup.string()
			.required('Это обязательное поле')
			.min(6, 'Мин кол-во символов 6')
			.max(32, 'Макс кол-во символов 32'),
	})
	.defined();
