import { AddEditBorrowingHistoryDto } from '@/dtos/AddEditBorrowingHistory.dto';
import { BorrowingHistory } from '@/interfaces/borrowingHistory.interface';
import BorrowHistoryService from '@/services/borrowHistory.service';
import { NextFunction, Request, Response } from 'express';

class BorrowHistoryController {
  public borrowHistoryService = new BorrowHistoryService();

  public getBorrowingHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBorrowingHistoryData: BorrowingHistory[] = await this.borrowHistoryService.findAllBorrowingHistory();
      res.status(200).json({ BorrowingHistory: findAllBorrowingHistoryData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBorrowHistoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowHistoryId: string = req.params.id;
      const findOneBorrowingHistoryData: BorrowingHistory = await this.borrowHistoryService.findBorrowHistoryById(borrowHistoryId);
      res.status(200).json({ BorrowHistoryData: findOneBorrowingHistoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  // Borrow
  public createBorrowHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowHistoryData: AddEditBorrowingHistoryDto = req.body;
      const createBorrowHistoryData: BorrowingHistory = await this.borrowHistoryService.createBorrowHistory(borrowHistoryData);
      res.status(201).json({ BorrowingHistory: createBorrowHistoryData, message: 'Borrow history created successfully!' });
    } catch (error) {
      next(error);
    }
  };

  // Return 
  public updateBorrowHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowHistoryId: string = req.params.id;
      const borrowHistoryData: AddEditBorrowingHistoryDto = req.body;
      const updateBorrowingHistoryData: BorrowingHistory = await this.borrowHistoryService.updateBorrowHistory(borrowHistoryId, borrowHistoryData);

      res.status(200).json({ BorrowingHistory: updateBorrowingHistoryData, message: 'Borrowing history updated successfully!' });
    } catch (error) {
      next(error);
    }
  };
}

export default BorrowHistoryController;
