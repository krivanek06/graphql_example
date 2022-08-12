import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
	constructor(private readonly configService: ConfigService) {}
}
