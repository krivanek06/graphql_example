import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { GraphQLBackendModule } from './graphql/graphql.module';
import { LoggerModule } from './providers/logger/logger.module';
import { RedisClientModule } from './providers/redis/redis-client.module';
import redisConfig from './providers/redis/redis.config';
import { PubSubModule } from './providers/redis/redisPubSub.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [redisConfig],
			cache: true,
		}),
		GraphQLBackendModule,
		RedisClientModule,
		PubSubModule,
		LoggerModule,
	],
	controllers: [], // AppController
	providers: [AppService],
})
export class AppModule {}
