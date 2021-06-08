import { SchemaOf, object, string } from 'yup';

export interface IRecoveryPasswordForm {
	email: string;
}

export const recoveryPasswordFormSchema: SchemaOf<IRecoveryPasswordForm> = object()
	.shape({
		email: string().required('Это обязательное поле').email('Некорректный e-mail'),
	})
	.defined();
