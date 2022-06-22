import { BookAvailability } from "./bookAvailability.enum";
import { BookStatus } from "./bookStatus.enum";

export interface BorrowingHistory {
  _id: string;
  user: Object;
  book: Object;
  date_borrowed: Date;
  date_returned: Date;
  status: BookStatus;
}