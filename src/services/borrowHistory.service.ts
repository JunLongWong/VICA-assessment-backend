import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { borrowingHistoryModel } from '@/models/borrowing_history.model';
import { AddEditBorrowingHistoryDto } from '@/dtos/AddEditBorrowingHistory.dto';
import { BorrowingHistory } from '@/interfaces/borrowingHistory.interface';

class BorrowHistoryService {
  public borrowingHistory = borrowingHistoryModel;

  public async findBorrowHistoryById(borrowHistoryId: string): Promise<BorrowingHistory> {
    try {
      if (isEmpty(borrowHistoryId)) throw new HttpException(400, 'Please fill up all required fields');

      const findBorrowHistory: BorrowingHistory = await this.borrowingHistory.findOne({ _id: borrowHistoryId });
      if (!findBorrowHistory) throw new HttpException(409, 'Borrow History does not exist !');

      return findBorrowHistory;
    } catch (error) {
      throw new HttpException(500, `Sever error: ${error}`);
    }
  }

  public async createBorrowHistory(borrowingHistoryData: AddEditBorrowingHistoryDto): Promise<BorrowingHistory> {
    try {
      const createBorrowingHistory: BorrowingHistory = await this.borrowingHistory.create({ ...borrowingHistoryData });
      return createBorrowingHistory
    } catch (error) {
      throw new HttpException(500, 'Error creating borrowing history !');
    }
  }

  public async updateBorrowHistory(borrowHistoryId: string, borrowingHistoryData: AddEditBorrowingHistoryDto): Promise<BorrowingHistory> {

    const updateBorrowingHistoryById: BorrowingHistory = await this.borrowingHistory.findByIdAndUpdate(borrowHistoryId, { ...borrowingHistoryData });
    if (!updateBorrowingHistoryById) throw new HttpException(409, 'Update Borrowing History Failed !');

    const updatedBorrowingHistory: BorrowingHistory = await this.borrowingHistory.findOne({ _id: borrowHistoryId });
    return updatedBorrowingHistory;
  }
}

export default BorrowHistoryService;
