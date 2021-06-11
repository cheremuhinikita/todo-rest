import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	Length,
} from '@common/decorators/validator/external';

import { Role } from '@common/enums/role.enum';

export class CreateOrUpdateUserDto {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@Length(2, 32)
	readonly username: string;

	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly password: string;

	@IsNotEmpty()
	@IsEnum(Role)
	readonly role: Role;
}
