import { User } from '@/interfaces/users.interface';
import { IsEmail, IsString, ValidateNested } from 'class-validator';

export class UserResponse {
  @IsString() private readonly _id: string;
  @IsEmail() private readonly email: string;
  @IsString() private readonly name: string;
  @IsString() private readonly role: string;
  @IsString() private readonly status: string;
  @IsString() private readonly date_joined: string;

  constructor(user: User) {
    this._id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.status = user.status;
    this.date_joined = user.date_joined.toISOString();
  }
}
