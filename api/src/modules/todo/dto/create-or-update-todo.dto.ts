import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrUpdateTodoDto {
	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	readonly description: string;
}
