import * as Yup from 'yup';

export interface IResetPasswordForm {
	email: string;
	passwordChangeCode: string;
	password: string;
	passwordConfirm: string;
}

export const resetPasswordFormSchema: Yup.SchemaOf<IResetPasswordForm> = Yup.object()
	.shape({
		email: Yup.string(),
		passwordChangeCode: Yup.string()
			.required('Это обязательное поле')
			.matches(/^\d+$/, 'Код является числом')
			.length(8, 'Код должен состоять из 8 цифр'),
		password: Yup.string()
			.required('Это обязательное поле')
			.min(6, 'Мин кол-во символов 6')
			.max(32, 'Макс кол-во символов 32'),
		passwordConfirm: Yup.string()
			.required('Это обязательное поле')
			.oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
	})
	.defined();
