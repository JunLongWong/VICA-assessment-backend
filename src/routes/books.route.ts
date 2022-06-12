import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import permisssionMiddleware from '@/middlewares/permission.middleware';
import { UserRoleType } from '@/interfaces/userRoleType.enum';
import BookController from '@/controllers/books.controller';
import { AddEditBookDto } from '@/dtos/AddEditBook.dto';

class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  public booksController = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN, UserRoleType.EDITOR, UserRoleType.MEMBER]),
      this.booksController.getBooks,
    );
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN, UserRoleType.EDITOR, UserRoleType.MEMBER]),
      this.booksController.getBookById,
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN, UserRoleType.EDITOR]),
      validationMiddleware(AddEditBookDto, 'body'),
      this.booksController.createBook,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN, UserRoleType.EDITOR]),
      validationMiddleware(AddEditBookDto, 'body', true),
      this.booksController.updateBook,
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN, UserRoleType.EDITOR]),
      this.booksController.deleteBook,
    );
  }
}

export default BooksRoute;
