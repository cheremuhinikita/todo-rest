import * as Yup from 'yup';

export interface IRecoveryPasswordForm extends Record<string, string> {
	email: string;
}

export const recoveryPasswordFormSchema: Yup.SchemaOf<IRecoveryPasswordForm> = Yup.object()
	.shape({
		email: Yup.string().required('Это обязательное поле').email('Некорректный e-mail'),
	})
	.defined();
