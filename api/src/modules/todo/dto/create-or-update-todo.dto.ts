import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateTodoDto {
	@IsNotEmpty()
	@IsString()
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	readonly description: string;
}
