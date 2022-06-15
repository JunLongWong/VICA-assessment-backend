
import { BookAvailability } from '@/interfaces/bookAvailability.enum';
import { BookStatus } from '@/interfaces/bookStatus.enum';
import { IsString, IsNotEmpty, IsNumber, IsObject, IsDate, IsEnum } from 'class-validator';

export class AddEditBorrowingHistoryDto {
  @IsNotEmpty()
  @IsObject()
  public user: Object;

  @IsNotEmpty()
  @IsObject()
  public book: Object;

  @IsNotEmpty()
  @IsDate()
  public date_borrowed: Date = new Date();

  @IsDate()
  public date_returned: Date;

  @IsNotEmpty()
  @IsEnum(BookStatus)
  public status: BookStatus;

  @IsNotEmpty()
  @IsEnum(BookAvailability)
  public availability: BookAvailability;
}
