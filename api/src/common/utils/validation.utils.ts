import { ValidationError } from '@nestjs/common';

import { IRequestValidationError } from '@common/interfaces/request-validation-error.interface';

export const mapError = ({ property, constraints }: ValidationError): IRequestValidationError => ({
	property,
	error: Object.values(constraints).pop(),
});
