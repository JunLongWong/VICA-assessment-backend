import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { bookModel } from '@/models/book.model';
import { Book } from '@/interfaces/book.interface';
import { AddEditBookDto } from '@/dtos/AddEditBook.dto';
import { BookResponse } from './BookResponse';
import { BookResponseList } from './BookResponseList';
import { BookAvailability } from '@/interfaces/bookAvailability.enum';

class BookService {
  public books = bookModel;

  public async findAllBook(): Promise<BookResponseList> {
    try {
      const books: Book[] = await this.books.find();
      return new BookResponseList(books);
    } catch (error) {
      throw new HttpException(500, `Sever error: ${error}`);
    }
  }

  public async findBookById(bookId: string): Promise<Book> {
    try {
      if (isEmpty(bookId)) throw new HttpException(400, 'Please fill up all required fields');

      const findBook: Book = await this.books.findOne({ _id: bookId });
      if (!findBook) throw new HttpException(409, 'Book does not exist !');

      return findBook;
    } catch (error) {
      throw new HttpException(500, `Sever error: ${error}`);
    }
  }

  public async createBook(bookData: AddEditBookDto): Promise<BookResponse> {
    if (bookData.quantity < 1) throw new HttpException(400, 'Book Quantity must be more than 0');
    if (isEmpty(bookData)) throw new HttpException(400, 'Please fill up all required fields');

    const findBook: Book = await this.books.findOne({
      title: bookData.title,
      description: bookData.description,
      genre: bookData.genre,
      author: bookData.author,
      published_year: bookData.published_year,
    });

    // if (findBook) throw new HttpException(409, 
    //   `Your book ${findBook.title} already exists`);

    // create book if book doesn't exist
    if (!findBook) {
      const createBook: Book = await this.books.create({ ...bookData, quantity: bookData.quantity });

      return new BookResponse(createBook);
    } else {
      // update book, increment the quantity
      const updatedBookQuantity: BookResponse = await this.updateBook(findBook._id, { ...bookData, quantity: findBook.quantity + bookData.quantity });
      return updatedBookQuantity;
    }
  }

  public async updateBook(bookId: string, bookData: AddEditBookDto): Promise<BookResponse> {
    bookData.quantity = bookData.quantity | 0
    if (bookData.quantity < 0) throw new HttpException(400, 'Book Quantity cannot be negative !');

    if (bookData.quantity === 0) {
      bookData = { ...bookData, availability: BookAvailability.UNAVAILABLE }
    }
    if (bookData.quantity > 0) {
      bookData = { ...bookData, availability: BookAvailability.AVAILABLE }
    }

    if (isEmpty(bookData)) throw new HttpException(400, 'Please fill up all required fields');

    const updateBookById: Book = await this.books.findByIdAndUpdate(bookId, { ...bookData });
    if (!updateBookById) throw new HttpException(409, 'Update Book Failed !');

    const updatedBook: Book = await this.books.findOne({ _id: bookId });
    return new BookResponse(updatedBook);
  }

  public async deleteBook(bookId: string): Promise<BookResponse> {
    const deleteBookById: Book = await this.books.findByIdAndDelete(bookId);
    if (!deleteBookById) throw new HttpException(409, 'Failed to delete book !');

    return new BookResponse(deleteBookById);
  }
}

export default BookService;
