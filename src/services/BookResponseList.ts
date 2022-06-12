import { Book } from '@/interfaces/book.interface';
import { BookResponse } from './BookResponse';

export class BookResponseList {
  private readonly bookList: BookResponse[];

  constructor(book: Book[]) {
    this.bookList = book.map(book => {
      return new BookResponse(book);
    });
  }
}
