import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import permisssionMiddleware from '@/middlewares/permission.middleware';
import { UserRoleType } from '@/interfaces/userRoleType.enum';
import { AddEditBorrowingHistoryDto } from '@/dtos/AddEditBorrowingHistory.dto';
import BorrowHistoryController from '@/controllers/borrowHistory.controller';

class BorrowHistoryRoute implements Routes {
  public path = '/borrow-history';
  public router = Router();
  public borrowHistoryController = new BorrowHistoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN]),
      this.borrowHistoryController.getBorrowHistoryById,
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN]),
      validationMiddleware(AddEditBorrowingHistoryDto, 'body'),
      this.borrowHistoryController.createBorrowHistory,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN]),
      validationMiddleware(AddEditBorrowingHistoryDto, 'body', true),
      this.borrowHistoryController.updateBorrowHistory,
    );
  }
}

export default BorrowHistoryRoute;
