import { SchemaOf, object, string, ref } from 'yup';

export interface IResetPasswordForm {
	email: string;
	passwordChangeCode: string;
	password: string;
	passwordConfirm: string;
}

export const resetPasswordFormSchema: SchemaOf<IResetPasswordForm> = object()
	.shape({
		email: string(),
		passwordChangeCode: string()
			.required('Это обязательное поле')
			.matches(/^\d+$/, 'Код является числом')
			.length(8, 'Некорректный код'),
		password: string()
			.required('Это обязательное поле')
			.min(6, 'Мин кол-во символов 6')
			.max(32, 'Макс кол-во символов 32'),
		passwordConfirm: string()
			.required('Это обязательное поле')
			.oneOf([ref('password'), null], 'Пароли не совпадают'),
	})
	.defined();
