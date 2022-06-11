import { CreateUserDto } from '@/dtos/users.dto';
import { UserRoleType } from './userRoleType.interface';
import { UserStatus } from './userStatus.interface';

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: UserRoleType;
  status: UserStatus;
  date_joined: Date;
}

export interface SuperAdminSignup {
  signup(userData: CreateUserDto):Promise<User>;
}