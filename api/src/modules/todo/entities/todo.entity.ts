import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@common/entities/base.entity';

import { User } from '@modules/users/entities/user.entity';

import { ITodo } from '../interfaces/todo.interface';

@Entity()
export class Todo extends BaseEntity implements ITodo {
	@Column({ type: 'varchar', length: 32 })
	title: string;

	@Column({ type: 'text' })
	description: string;

	@ManyToOne(() => User, (user: User) => user.todo, {
		onDelete: 'CASCADE',
	})
	user: User;
}
