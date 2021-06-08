import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { ConfigRootModule } from '@common/modules/config-root.module';
import { TypeOrmRootModule } from '@common/modules/typeorm-root.module';
import { RedisCacheModule } from '@common/modules/redis-cache/redis-cache.module';

import { AuthMiddleware } from '@modules/auth/middlewares/auth.middleware';
import { InitializerModule } from '@modules/initializer/initializer.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { TodoModule } from '@modules/todo/todo.module';

@Module({
	imports: [
		ConfigRootModule,
		TypeOrmRootModule,
		RedisCacheModule,
		InitializerModule,
		AuthModule,
		UsersModule,
		TodoModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}
