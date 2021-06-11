import { Type } from 'class-transformer';

import {
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsString,
	Length,
} from '@common/decorators/validator/external';
import { PASSWORD_CHANGE_CODE_LENGTH } from '@common/constants';
import { IsEqualTo } from '@common/decorators/validator/is-equal-to.decorator';
import { LengthNumber } from '@common/decorators/validator/length-number.decorator';

export class ResetPasswordDto {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@Type(() => Number)
	@IsNumber()
	@IsInt()
	@LengthNumber(PASSWORD_CHANGE_CODE_LENGTH)
	readonly passwordChangeCode: number;

	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly password: string;

	@IsNotEmpty()
	@IsEqualTo('password')
	readonly passwordConfirm: string;
}
