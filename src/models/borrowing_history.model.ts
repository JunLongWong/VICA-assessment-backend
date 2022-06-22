import { BookAvailability } from '@/interfaces/bookAvailability.enum';
import { BookStatus } from '@/interfaces/bookStatus.enum';
import { BorrowingHistory } from '@/interfaces/borrowingHistory.interface';
import { model, Schema } from 'mongoose';

const borrowingHistorySchema = new Schema<BorrowingHistory>({
  user: {
    type: Object,
    required: true,
  },
  book: {
    type: Object,
    required: true,
  },
  date_borrowed: {
    type: Date,
    required: true,
  },
  date_returned: {
    type: Date,
  },
  status: {
    type: BookStatus,
    required: true,
  },
});

// creation of borrowingHistory model
const borrowingHistoryModel = model<BorrowingHistory>('BorrowingHistory', borrowingHistorySchema);

export { borrowingHistoryModel };
