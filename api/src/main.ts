import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { ValidationException } from '@common/exceptions/validation.exception';

import { InitializerService } from '@modules/initializer/initializer.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			exceptionFactory: (errors) => new ValidationException(errors),
		}),
	);

	const configService = app.get(ConfigService);
	const initializerService = app.get(InitializerService);

	const port = +configService.get('API_PORT') || 3000;
	await initializerService.initializeAll();

	await app.listen(port);
	Logger.log(`Server is running on port ${port}`, 'Boostrap');
}
bootstrap();
