import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
