import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { borrowingHistoryModel } from '@/models/borrowing_history.model';
import { AddEditBorrowingHistoryDto } from '@/dtos/AddEditBorrowingHistory.dto';
import { BorrowingHistory } from '@/interfaces/borrowingHistory.interface';
import BookService from './books.services';
import { BookStatus } from '@/interfaces/bookStatus.enum';

class BorrowHistoryService {
  public borrowingHistory = borrowingHistoryModel;
  public bookService = new BookService();

  public async findAllBorrowingHistory(): Promise<BorrowingHistory[]> {
    try {
      const getAllBorrowingHistory: BorrowingHistory[] = await this.borrowingHistory.find();
      return getAllBorrowingHistory;
    } catch (error) {
      throw new HttpException(500, `Sever error: ${error}`);
    }
  }

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

  // Borrow Book
  public async createBorrowHistory(borrowingHistoryData: AddEditBorrowingHistoryDto): Promise<BorrowingHistory> {
    try {
      if (borrowingHistoryData.qty === undefined) { borrowingHistoryData.qty = 1 }

      borrowingHistoryData.qty = borrowingHistoryData.qty | 0 //round down // to delete

      const bookId = borrowingHistoryData.book
      const book = await this.bookService.findBookById(bookId.toString())

      if (borrowingHistoryData.qty > book.quantity) {
        throw new HttpException(400, "Borrowing quantity exceeds available book quantity !")
      }

      const newBookQty: number = (book.quantity - borrowingHistoryData.qty)

      await this.bookService.updateBook(bookId.toString(),
        {
          title: book.title,
          description: book.description,
          genre: book.genre,
          author: book.author,
          published_year: book.published_year,
          quantity: newBookQty,
          availability: book.availability
        }
      )
      const createBorrowingHistory: BorrowingHistory = await this.borrowingHistory.create({ ...borrowingHistoryData });
      return createBorrowingHistory
    } catch (error) {
      console.log(error)
      throw new HttpException(500, 'Error creating borrowing history !');
    }
  }

  // Return Book
  public async updateBorrowHistory(borrowHistoryId: string, borrowingHistoryData: AddEditBorrowingHistoryDto): Promise<BorrowingHistory> {
    // check whether book is returned ?
    const borrowHistoryObj: BorrowingHistory = await this.findBorrowHistoryById(borrowHistoryId);

    if (borrowHistoryObj.status === BookStatus.RETURNED) {
      throw new HttpException(400, "Book has already been returned !!")
    }

    // find book._id && increase book.Quantity by 1

    if (borrowingHistoryData.qty === undefined) { borrowingHistoryData.qty = 1 }
    const bookId = borrowingHistoryData.book
    const book = await this.bookService.findBookById(bookId.toString())
    const newBookQty: number = (book.quantity + borrowingHistoryData.qty)
    await this.bookService.updateBook(bookId.toString(),
      {
        title: book.title,
        description: book.description,
        genre: book.genre,
        author: book.author,
        published_year: book.published_year,
        quantity: newBookQty,
        availability: book.availability
      }
    )
    const newBorrowHistoryData = { ...borrowingHistoryData, date_returned: new Date(), status: BookStatus.RETURNED }

    const updateBorrowingHistoryById: BorrowingHistory = await this.borrowingHistory.findByIdAndUpdate(borrowHistoryId, { ...newBorrowHistoryData });
    if (!updateBorrowingHistoryById) throw new HttpException(409, 'Update Borrowing History Failed !');

    const updatedBorrowingHistory: BorrowingHistory = await this.borrowingHistory.findOne({ _id: borrowHistoryId });
    return updatedBorrowingHistory;
  }
}

export default BorrowHistoryService;
