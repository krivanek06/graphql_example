import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RedisConfig } from './redis.config';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: PUB_SUB,
			useFactory: (configService: ConfigService) => {
				return new RedisPubSub({
					connection: {
						host: configService.get<RedisConfig>('redis').host,
						port: configService.get<RedisConfig>('redis').port,
					},
				});
			},
			inject: [ConfigService],
		},
	],
	exports: [PUB_SUB],
})
export class PubSubModule {}
