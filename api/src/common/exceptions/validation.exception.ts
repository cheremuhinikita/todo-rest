import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

import { mapError } from '@common/utils/validation.utils';

export class ValidationException extends HttpException {
	constructor(errors: ValidationError[]) {
		super(
			{
				statusCode: HttpStatus.BAD_REQUEST,
				message: 'Validation failed',
				errors: errors.map(mapError),
			},
			HttpStatus.BAD_REQUEST,
		);
	}
}
