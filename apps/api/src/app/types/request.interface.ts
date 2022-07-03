import { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';

export interface Request extends ExpressRequest {
  user?: User;
}
