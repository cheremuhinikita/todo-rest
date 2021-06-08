import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { classToPlain } from 'class-transformer';

export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createDate: Date;

	@UpdateDateColumn()
	updateDate: Date;

	toJSON(): Record<string, unknown> {
		return classToPlain(this);
	}
}
