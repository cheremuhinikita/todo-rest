import { Module } from '@nestjs/common';

import { JwtRootModule } from '@common/modules/jwt-root.module';
import { MailerRootModule } from '@common/modules/mailer-root.module';

import { UsersModule } from '@modules/users/users.module';

import { AuthController } from './auth.controller';

@Module({
	imports: [JwtRootModule, MailerRootModule, UsersModule],
	controllers: [AuthController],
	exports: [JwtRootModule],
})
export class AuthModule {}
