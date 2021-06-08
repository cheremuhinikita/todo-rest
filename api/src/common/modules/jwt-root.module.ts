import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const JwtRootModule = JwtModule.registerAsync({
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => ({
		secret: configService.get('JWT_SECRET_KEY'),
		signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
	}),
	inject: [ConfigService],
});
