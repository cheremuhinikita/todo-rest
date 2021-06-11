import { IsNotEmpty, IsString, Length } from '@common/decorators/validator/external';

export class CreateOrUpdateTodoDto {
	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	readonly description: string;
}
