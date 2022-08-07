import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
