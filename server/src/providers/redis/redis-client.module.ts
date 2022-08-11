import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';
import { RedisConfig } from './redis.config';
import { RedisService } from './redis.service';

@Global()
@Module({
	imports: [
		ConfigModule,
		RedisModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService, LoggerService],
			useFactory: (configService: ConfigService, logger: LoggerService) => {
				logger.setContext(RedisClientModule.name);
				return {
					readyLog: true,
					config: {
						url: configService.get<RedisConfig>('redis').url,
					},
					onClientReady: (client) => {
						client.on('error', (err) => {
							logger.error(err);
						});
					},
				};
			},
		}),
	],
	providers: [RedisService],
	exports: [RedisService, RedisModule],
})
export class RedisClientModule {}
