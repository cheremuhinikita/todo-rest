import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';

import { BaseController } from '@common/controllers/base.controller';
import { IBaseCrudController } from '@common/interfaces/base-crud-controller.interface';
import { Auth } from '@common/decorators/auth.decorator';
import { UserContext } from '@common/decorators/user-context.decorator';
import { Role } from '@common/enums/role.enum';
import { ParamsDto } from '@common/dto/params.dto';

import { User } from '@modules/users/entities/user.entity';

import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateOrUpdateTodoDto } from './dto/create-or-update-todo.dto';

@Auth(Role.USER)
@Controller('todo')
export class TodoController extends BaseController implements IBaseCrudController<Todo> {
	constructor(private readonly todoService: TodoService) {
		super();
	}

	@Post()
	async create(
		@UserContext() user: User,
		@Body() createTodoDto: CreateOrUpdateTodoDto,
	): Promise<Todo> {
		return this.todoService.create(createTodoDto, user);
	}

	@Get()
	async findAll(@UserContext() user: User): Promise<Todo[]> {
		return this.todoService.findAll(user);
	}

	@Get(':id')
	async findOne(@Param() { id }: ParamsDto, @UserContext() user: User): Promise<Todo> {
		return await this.checkEntity(
			() => this.todoService.findOneByIdAndUser(id, user, true),
			`Todo by id #${id} does not exists`,
		);
	}

	@Put(':id')
	async update(
		@Param() { id }: ParamsDto,
		@UserContext() user: User,
		@Body() updateTodoDto: CreateOrUpdateTodoDto,
	): Promise<Todo> {
		const existTodo = await this.checkEntity(
			() => this.todoService.findOneByIdAndUser(id, user),
			`Todo by id #${id} does not exists`,
		);

		return this.todoService.update(existTodo, updateTodoDto);
	}

	@Delete(':id')
	async remove(@Param() { id }: ParamsDto, @UserContext() user: User): Promise<true> {
		const existTodo = await this.checkEntity(
			() => this.todoService.findOneByIdAndUser(id, user),
			`Todo by id #${id} does not exists`,
		);

		await this.todoService.remove(existTodo);

		return true;
	}
}
