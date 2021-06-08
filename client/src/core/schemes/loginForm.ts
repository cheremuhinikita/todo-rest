import { SchemaOf, object, string } from 'yup';

export interface ILoginForm {
	username: string;
	password: string;
}

export const loginFormSchema: SchemaOf<ILoginForm> = object()
	.shape({
		username: string()
			.required('Это обязательное поле')
			.min(2, 'Мин кол-во символов 2')
			.max(32, 'Макс кол-во символов 32'),
		password: string()
			.required('Это обязательное поле')
			.min(6, 'Мин кол-во символов 6')
			.max(32, 'Макс кол-во символов 32'),
	})
	.defined();
