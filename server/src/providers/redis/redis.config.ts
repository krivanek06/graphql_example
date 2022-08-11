import { registerAs } from '@nestjs/config';

export interface RedisConfig {
	host: string;
	port: number;
	url: string;
}

export default registerAs(
	'redis',
	(): RedisConfig => ({
		host: process.env.REDIS_HOST || 'localhost',
		port: parseInt(process.env.REDIS_PORT) || 6379,
		url: process.env.REDIS_URL || 'redis://localhost:6379',
	})
);
