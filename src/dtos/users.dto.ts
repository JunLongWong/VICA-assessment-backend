import { UserRoleType } from '@/interfaces/userRoleType.enum';
import { UserStatus } from '@/interfaces/userStatus.enum';
import { IsEmail, IsString, IsDate, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsEnum(UserRoleType)
  public role: UserRoleType;

  @IsNotEmpty()
  @IsEnum(UserStatus)
  public status: UserStatus = UserStatus.ANALYSE;

  @IsNotEmpty()
  @IsDate()
  public date_joined: Date = new Date();
}
