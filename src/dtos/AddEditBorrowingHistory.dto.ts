import { BookStatus } from '@/interfaces/bookStatus.enum';
import { IsNotEmpty, IsObject, IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddEditBorrowingHistoryDto {
  @IsNotEmpty()
  public user: ObjectId;

  @IsNotEmpty()
  public book: ObjectId;

  @IsDate()
  @IsOptional()
  public date_borrowed?: Date;

  @IsDate()
  @IsOptional()
  public date_returned?: Date;

  @IsOptional()
  @IsEnum(BookStatus)
  public status?: BookStatus;

  @IsOptional()
  @IsNumber()
  public qty?: number = 1;

}
