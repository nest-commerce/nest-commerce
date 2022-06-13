import { Role, User } from '@prisma/client';

export interface JwtPayload extends Partial<User> {
  username: string;
  role: Role;
}
