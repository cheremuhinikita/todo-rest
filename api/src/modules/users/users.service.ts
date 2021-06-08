import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { compareHash, generateRandomCode } from '@common/utils/crypto.utils';
import { PASSWORD_CHANGE_CODE_LENGTH } from '@common/constants';

import { User } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	public async checkPassword(password: string, passwordHash: string): Promise<boolean> {
		return compareHash(password, passwordHash);
	}

	public async create(newUser: Omit<IUser, 'todo'>): Promise<User> {
		const createdUser = this.usersRepository.create(newUser);

		return this.usersRepository.save(createdUser);
	}

	public async findAll(): Promise<User[]> {
		return this.usersRepository.find({ relations: ['todo'] });
	}

	public async findOneById(id: number, withRelations = false): Promise<User> {
		return this.usersRepository.findOne(
			{ id },
			withRelations ? { relations: ['todo'] } : undefined,
		);
	}

	public async findOneByEmail(email: string): Promise<User> {
		return this.usersRepository.findOne({ email });
	}

	public async findOneByUsername(username: string): Promise<User> {
		return this.usersRepository.findOne({ username });
	}

	public async findOneByPasswordChangeCodeAndEmail(
		passwordChangeCode: number,
		email: string,
	): Promise<User> {
		return this.usersRepository.findOne({ passwordChangeCode, email });
	}

	public async generatePasswordChangeCode(user: User): Promise<number> {
		const passwordChangeCode = generateRandomCode(PASSWORD_CHANGE_CODE_LENGTH);
		const updatedUser = this.usersRepository.merge(user, {
			passwordChangeCode,
		});

		await this.usersRepository.save(updatedUser);

		return passwordChangeCode;
	}

	public async update(user: User, updates: Omit<IUser, 'todo'>): Promise<User> {
		const updatedUser = this.usersRepository.merge(user, updates);

		return this.usersRepository.save(updatedUser);
	}

	public async resetPassword(user: User, password: string): Promise<void> {
		const updatedUser = this.usersRepository.merge(user, {
			password,
			passwordChangeCode: null,
		});

		await this.usersRepository.save(updatedUser);
	}

	public async remove(user: User): Promise<void> {
		await this.usersRepository.remove(user);
	}
}
