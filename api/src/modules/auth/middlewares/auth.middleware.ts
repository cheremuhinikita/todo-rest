import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

import { IJwtPayload } from '@common/interfaces/jwt-payload.interface';
import { USER_CONTEXT_KEY } from '@common/constants/key.constants';
import { RedisCacheService } from '@common/modules/redis-cache/redis-cache.service';

import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UsersService,
		private readonly redisCacheService: RedisCacheService,
	) {}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		const authHeaders = req.headers.authorization;

		if (authHeaders) {
			const token = authHeaders.split(' ').pop();
			if (!token) {
				throw new UnauthorizedException('Empty auth header');
			}

			let payload: IJwtPayload;

			try {
				payload = this.jwtService.verify<IJwtPayload>(token);
			} catch {
				throw new UnauthorizedException('Invalid auth header');
			}

			const user =
				(await this.redisCacheService.get<User>(payload.userId)) ||
				(await this.userService.findOneById(payload.userId, true));
			if (!user) {
				throw new UnauthorizedException('User not found');
			}

			req[USER_CONTEXT_KEY] = user;
		}

		next();
	}
}
