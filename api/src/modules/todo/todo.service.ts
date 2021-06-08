import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@modules/users/entities/user.entity';

import { Todo } from './entities/todo.entity';
import { ITodo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
	constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {}

	public async create(newTodo: Omit<ITodo, 'user'>, user: User): Promise<Todo> {
		const createdTodo = this.todoRepository.create({
			...newTodo,
			user,
		});

		return this.todoRepository.save(createdTodo);
	}

	public async findAll(user: User): Promise<Todo[]> {
		return this.todoRepository.find({ user });
	}

	public async findOneByIdAndUser(id: number, user: User, withRelations = false): Promise<Todo> {
		return this.todoRepository.findOne(
			{ id, user },
			withRelations ? { relations: ['user'] } : undefined,
		);
	}

	public async update(todo: Todo, updates: Omit<ITodo, 'user'>): Promise<Todo> {
		const updatedTodo = this.todoRepository.merge(todo, updates);

		return this.todoRepository.save(updatedTodo);
	}

	public async remove(todo: Todo): Promise<void> {
		await this.todoRepository.remove(todo);
	}
}
