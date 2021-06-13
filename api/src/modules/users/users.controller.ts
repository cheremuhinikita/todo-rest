import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';

import { BaseController } from '@common/controllers/base.controller';
import { IBaseCrudController } from '@common/interfaces/base-crud-controller.interface';
import { Auth } from '@common/decorators/auth.decorator';
import { Role } from '@common/enums/role.enum';
import { ParamsDto } from '@common/dto/params.dto';

import { Todo } from '@modules/todo/entities/todo.entity';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateOrUpdateUserDto } from './dto/create-or-update-user.dto';

@Controller('users')
export class UsersController extends BaseController implements IBaseCrudController<User> {
	constructor(private readonly usersService: UsersService) {
		super();
	}

	@Auth(Role.ADMIN)
	@Post()
	async create(
		@Body() { email, username, ...createUserDto }: CreateOrUpdateUserDto,
	): Promise<User> {
		await this.checkUniqueEntity(
			() => this.usersService.findOneByEmail(email),
			'E-mail must be unique',
		);
		await this.checkUniqueEntity(
			() => this.usersService.findOneByUsername(username),
			'Username must be unique',
		);

		return this.usersService.create({
			...createUserDto,
			email,
			username,
		});
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(':id/todo')
	async findTodo(@Param() { id }: ParamsDto): Promise<Todo[]> {
		const { todo } = await this.checkEntity(
			() => this.usersService.findOneById(id, true),
			`User by id #${id} does not exists`,
		);

		return todo;
	}

	@Auth(Role.ADMIN)
	@Get(':id')
	async findOne(@Param() { id }: ParamsDto): Promise<User> {
		return this.checkEntity(
			() => this.usersService.findOneById(id, true),
			`User by id #${id} does not exists`,
		);
	}

	@Auth(Role.ADMIN)
	@Put(':id')
	async update(
		@Param() { id }: ParamsDto,
		@Body() { email, username, ...updateUserDto }: CreateOrUpdateUserDto,
	): Promise<User> {
		await this.checkUniqueUpdateEntity(
			() => this.usersService.findOneByEmail(email),
			{ id },
			'E-mail must be unique',
		);
		await this.checkUniqueUpdateEntity(
			() => this.usersService.findOneByUsername(username),
			{ id },
			'Username must be unique',
		);

		const existUser = await this.checkEntity(
			() => this.usersService.findOneById(id),
			`User by id #${id} does not exists`,
		);

		return this.usersService.update(existUser, { email, username, ...updateUserDto });
	}

	@Auth(Role.ADMIN)
	@Delete(':id')
	async remove(@Param() { id }: ParamsDto): Promise<true> {
		const existUser = await this.checkEntity(
			() => this.usersService.findOneById(id),
			`User by id #${id} does not exists`,
		);

		await this.usersService.remove(existUser);

		return true;
	}
}
