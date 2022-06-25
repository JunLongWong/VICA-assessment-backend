import { BookStatus } from '@/interfaces/bookStatus.enum';
import { BorrowingHistory } from '@/interfaces/borrowingHistory.interface';
import { model, Schema } from 'mongoose';

const borrowingHistorySchema = new Schema<BorrowingHistory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  date_borrowed: {
    type: Date,
    required: true,
    default: Date.now,
  },
  date_returned: {
    type: Date,
  },
  status: {
    type: BookStatus,
    required: true,
    default: BookStatus.BORROWED
  },
});

// creation of borrowingHistory model
const borrowingHistoryModel = model<BorrowingHistory>('BorrowingHistory', borrowingHistorySchema);

export { borrowingHistoryModel };
