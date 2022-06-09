import { IsEmail, IsString, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  // @IsString()
  // public name: string;
  
  // @IsString()
  // public role: string;
  
  // @IsString()
  // public status: string;

  @IsDate()
  public date_joined: Date;


  // datejoined
}
