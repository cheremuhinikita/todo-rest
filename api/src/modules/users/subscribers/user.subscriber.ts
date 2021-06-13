import {
	Connection,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	RemoveEvent,
	UpdateEvent,
} from 'typeorm';

import { RedisCacheService } from '@common/modules/redis-cache/redis-cache.service';
import { generateHash } from '@common/utils/crypto.utils';

import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	constructor(
		private readonly connection: Connection,
		private readonly redisCacheService: RedisCacheService,
	) {
		connection.subscribers.push(this);
	}

	listenTo(): typeof User {
		return User;
	}

	async hashPassword(entity: User): Promise<void> {
		entity.password = await generateHash(entity.password);
	}

	async beforeInsert({ entity }: InsertEvent<User>): Promise<void> {
		await this.hashPassword(entity);
	}

	async beforeUpdate({ entity, databaseEntity }: UpdateEvent<User>): Promise<void> {
		if (entity.password !== databaseEntity.password) await this.hashPassword(entity);
	}

	async afterInsert({ entity }: InsertEvent<User>): Promise<void> {
		await this.redisCacheService.set(entity.id, entity);
	}

	async afterUpdate({ entity }: UpdateEvent<User>): Promise<void> {
		await this.redisCacheService.set(entity.id, entity);
	}

	async afterRemove({ entityId }: RemoveEvent<User>): Promise<void> {
		await this.redisCacheService.del(entityId);
	}
}
