import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddEditBookDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public genre: string;

  @IsNotEmpty()
  @IsString()
  public author: string;

  @IsNotEmpty()
  @IsNumber()
  public published_year: number;

  @IsNotEmpty()
  @IsNumber()
  public quantity: number;
}
