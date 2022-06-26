import { ObjectId } from "mongoose";
import { BookStatus } from "./bookStatus.enum";

export interface BorrowingHistory {
  _id: string;
  user: ObjectId;
  book: ObjectId;
  date_borrowed: Date;
  date_returned: Date;
  status: BookStatus;
}