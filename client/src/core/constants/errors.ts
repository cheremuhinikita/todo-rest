import { ErrorCodes } from '@core/enums';
import { ExcludedErrorCodes } from '@core/types';

type Errors = Record<
	ExcludedErrorCodes,
	{
		title: string;
		desciprtion: string;
	}
>;

const ERROR_DESCIPTION =
	'Вы либо попробовали какой-то сомнительный маршрут, либо пришли сюда по ошибке. Что бы это ни было, попробуйте воспользоваться навигацией.';

export const ERRORS: Errors = {
	[ErrorCodes.InternalServerError]: {
		title: 'Внутренняя ошибка сервера',
		desciprtion: ERROR_DESCIPTION,
	},
	[ErrorCodes.NotFound]: {
		title: 'Страницы, которую вы ищете, здесь нет',
		desciprtion: ERROR_DESCIPTION,
	},
	[ErrorCodes.Forbidden]: {
		title: 'Доступ запрещен',
		desciprtion: ERROR_DESCIPTION,
	},
};
