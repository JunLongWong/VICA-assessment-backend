import { Book } from '@/interfaces/book.interface';
import { IsEmail, IsString } from 'class-validator';

export class BookResponse {
  @IsString() private readonly _id: string;
  @IsString() private readonly title: string;
  @IsEmail() private readonly description: string;
  @IsString() private readonly genre: string;
  @IsString() private readonly author: string;
  @IsString() private readonly published_year: number;
  @IsString() private readonly quantity: number;

  constructor(book: Book) {
    this._id = book._id;
    this.title = book.title;
    this.description = book.description;
    this.genre = book.genre;
    this.author = book.author;
    this.published_year = book.published_year;
    this.quantity = book.quantity;
  }
}
