import { CreateUserDto } from '@/dtos/users.dto';
import { UserResponse } from '@/services/UserResponse';
import { UserRoleType } from './userRoleType.enum';
import { UserStatus } from './userStatus.enum';

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
  createUser(userData: CreateUserDto): Promise<UserResponse>;
}
