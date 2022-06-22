import { Request } from 'express';
import { User } from '@interfaces/users.interface';
import { UserRoleType } from './userRoleType.enum';

export interface DataStoredInToken {
  _id: string;
  role: UserRoleType;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
