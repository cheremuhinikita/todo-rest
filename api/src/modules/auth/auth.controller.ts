import { Controller, Post, Get, Body } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

import { BaseController } from '@common/controllers/base.controller';
import { IJwtPayload } from '@common/interfaces/jwt-payload.interface';
import { Role } from '@common/enums/role.enum';
import { UserContext } from '@common/decorators/user-context.decorator';

import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/entities/user.entity';

import { ILoginResponse } from './interfaces/login-response.interface';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RecoveryPasswordDto } from './dto/recovery-password';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController extends BaseController {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
		private readonly mailerService: MailerService,
	) {
		super();
	}

	@Post('register')
	async create(@Body() { email, username, ...registerUserDto }: RegisterUserDto): Promise<User> {
		await this.checkUniqueEntity(
			() => this.usersService.findOneByEmail(email),
			'E-mail must be unique',
		);
		await this.checkUniqueEntity(
			() => this.usersService.findOneByUsername(username),
			'Username must be unique',
		);

		return this.usersService.create({
			...registerUserDto,
			email,
			username,
			role: Role.USER,
		});
	}

	@Post('login')
	async login(@Body() { username, password }: LoginUserDto): Promise<ILoginResponse> {
		const existUser = await this.checkValidEntity(
			() => this.usersService.findOneByUsername(username),
			'Invalid username',
		);

		await this.checkValidEntity(
			() => this.usersService.checkPassword(password, existUser.password),
			'Invalid password',
		);

		const token = await this.jwtService.signAsync({
			userId: existUser.id,
		} as IJwtPayload);

		return {
			token,
			profile: existUser,
		};
	}

	@Get('profile')
	getProfile(@UserContext() user: User): User {
		return user;
	}

	@Post('recovery-password')
	async recoveryPassword(@Body() { email }: RecoveryPasswordDto): Promise<true> {
		const existUser = await this.checkValidEntity(
			() => this.usersService.findOneByEmail(email),
			'Invalid e-mail',
		);

		const passwordChangeCode = await this.usersService.generatePasswordChangeCode(existUser);

		await this.mailerService.sendMail({
			to: email,
			from: 'admin@todo.com',
			subject: 'Потверждение смены пароля',
			text: 'Смена пароля',
			html: `Код потверждения - ${passwordChangeCode}`,
		});

		return true;
	}

	@Post('reset-password')
	async resetPassword(
		@Body() { email, passwordChangeCode, password }: ResetPasswordDto,
	): Promise<true> {
		const existUser = await this.checkValidEntity(
			() => this.usersService.findOneByPasswordChangeCodeAndEmail(passwordChangeCode, email),
			'Invalid password change code',
		);

		await this.usersService.resetPassword(existUser, password);

		return true;
	}
}
