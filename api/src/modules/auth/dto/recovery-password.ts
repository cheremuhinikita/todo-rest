import { IsEmail, IsNotEmpty } from '@common/decorators/validator/external';

export class RecoveryPasswordDto {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;
}
