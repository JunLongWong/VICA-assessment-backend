import { AddEditBookDto } from '@/dtos/AddEditBook.dto';
import { Book } from '@/interfaces/book.interface';
import { BookResponse } from '@/services/BookResponse';
import { BookResponseList } from '@/services/BookResponseList';
import BookService from '@/services/books.services';
import { NextFunction, Request, Response } from 'express';

class BookController {
  public bookService = new BookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBooksData: BookResponseList = await this.bookService.findAllBook();
      res.status(200).json({ Books: findAllBooksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const findOneBookData: Book = await this.bookService.findBookById(bookId);
      res.status(200).json({ Book: findOneBookData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData: AddEditBookDto = req.body;
      const createBookData: BookResponse = await this.bookService.createBook(bookData);

      res.status(201).json({ Book: createBookData, message: 'book created successfully!' });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const bookData: AddEditBookDto = req.body;
      const updateBookData: BookResponse = await this.bookService.updateBook(bookId, bookData);

      res.status(200).json({ Book: updateBookData, message: 'book updated successfully!' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const deleteBookData: BookResponse = await this.bookService.deleteBook(bookId);

      res.status(200).json({ Book: deleteBookData, message: 'book deleted successfully!' });
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
