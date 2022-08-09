import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getAllUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async getUserById(id: number): Promise<User> {
		return this.prisma.user.findUniqueOrThrow({
			where: {
				id,
			},
		});
	}
}
