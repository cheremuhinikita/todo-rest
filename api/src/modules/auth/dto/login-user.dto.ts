import { IsNotEmpty, IsString, Length } from '@common/decorators/validator/external';

export class LoginUserDto {
	@IsNotEmpty()
	@IsString()
	@Length(2, 32)
	readonly username: string;

	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly password: string;
}
