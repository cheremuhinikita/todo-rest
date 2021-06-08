import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@modules/users/users.module';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
	controllers: [TodoController],
	providers: [TodoService],
})
export class TodoModule {}
