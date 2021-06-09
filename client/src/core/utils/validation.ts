import { AxiosResponse } from 'axios';
import { UseFormSetError } from 'react-hook-form';

import { IErrorResponse, IValidationError } from '@core/interfaces';
import { MESSAGE_ERROR_VALIDATION_ERROR } from '@core/constants';

interface IValidationErrorResponse extends IErrorResponse {
	errors: IValidationError[];
}

export const handleValidationError = <T>(
	response: AxiosResponse<IValidationErrorResponse>,
	setError: UseFormSetError<T>,
): void => {
	if (response?.data?.message === MESSAGE_ERROR_VALIDATION_ERROR) {
		response?.data?.errors.forEach(({ property, error }) => {
			setError(property, { message: error });
		});
	}
};
