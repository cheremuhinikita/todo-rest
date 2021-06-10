import * as Yup from 'yup';

import { Role } from '@core/enums';

export interface ICreateOrUpdateUserForm extends Record<string, string> {
	email: string;
	username: string;
	password: string;
	role: Role;
}

export const createOrUpdateUserFormSchema: Yup.SchemaOf<ICreateOrUpdateUserForm> = Yup.object()
	.shape({
		email: Yup.string().required('Это обязательное поле').email('Некорректный e-mail'),
		username: Yup.string()
			.required('Это обязательное поле')
			.min(2, 'Мин кол-во символов 2')
			.max(32, 'Макс кол-во символов 32'),
		password: Yup.string()
			.required('Это обязательное поле')
			.min(6, 'Мин кол-во символов 6')
			.max(32, 'Макс кол-во символов 32'),
		role: Yup.mixed().required('Это обязательное поле').oneOf(Object.values(Role)),
	})
	.defined();
