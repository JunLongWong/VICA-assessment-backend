import { User } from '@/interfaces/users.interface';
import { UserResponse } from './UserResponse';

export class UserResponseList {
  private readonly user: UserResponse[];

  constructor(user: User[]) {
    this.user = user.map(user => {
      return new UserResponse(user);
    });
  }
}
