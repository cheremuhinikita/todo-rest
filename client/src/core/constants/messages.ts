export const MESSAGE_ERROR_UNIQUE_EMAIL = 'E-mail must be unique';
export const MESSAGE_ERROR_UNIQUE_USERNAME = 'Username must be unique';
export const MESSAGE_ERROR_INVALID_USERNAME = 'Invalid username';
export const MESSAGE_ERROR_INVALID_PASSWORD = 'Invalid password';
export const MESSAGE_ERROR_INVALID_EMAIL = 'Invalid e-mail';
export const MESSAGE_ERROR_VALIDATION_ERROR = 'Validation failed';
export const MESSAGE_ERROR_INVALID_PASSWORD_CHANGE_TOKEN = 'Invalid password change code';
export const MESSAGE_ERROR_DEFAULT = 'Произошла ошибка';

export const SERVER_ERRORS_MESSAGES = {
	[MESSAGE_ERROR_UNIQUE_EMAIL]: 'Пользователь с таким e-mail уже сущесвует',
	[MESSAGE_ERROR_UNIQUE_USERNAME]: 'Пользователь с таким именем уже существует',
	[MESSAGE_ERROR_INVALID_USERNAME]: 'Неправильное имя пользователя',
	[MESSAGE_ERROR_INVALID_PASSWORD]: 'Неправильный пароль',
	[MESSAGE_ERROR_INVALID_EMAIL]: 'Неправильный e-mail',
	[MESSAGE_ERROR_VALIDATION_ERROR]: 'Возникла ошибка при валидации формы',
	[MESSAGE_ERROR_INVALID_PASSWORD_CHANGE_TOKEN]: 'Неправильный код сброса пароля',
} as const;

export const MESSAGE_SUCCESS_REGISTER = 'Вы успешно зарегистировались';
export const MESSAGE_SUCCESS_RECOVERY_PASSWORD = 'Вы успешно сбросили пароль';
