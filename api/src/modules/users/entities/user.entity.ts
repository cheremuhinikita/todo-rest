import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@common/entities/base.entity';
import { Role } from '@common/enums/role.enum';

import { Todo } from '@modules/todo/entities/todo.entity';

import { IUser } from '../interfaces/user.interface';

@Entity()
export class User extends BaseEntity implements IUser {
	@Column({ type: 'varchar', length: 256, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 32, unique: true })
	username: string;

	@Exclude()
	@Column({
		type: 'varchar',
		length: 60,
	})
	password: string;

	@Exclude()
	@Column({
		type: 'integer',
		nullable: true,
	})
	passwordChangeCode?: number;

	@Column({ enum: Role })
	role: Role;

	@OneToMany(() => Todo, (todo: Todo) => todo.user)
	todo: Todo[];
}
