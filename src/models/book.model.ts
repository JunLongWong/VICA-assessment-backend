import { model, Schema } from 'mongoose';
import { Book } from '@/interfaces/book.interface';
import { BookAvailability } from '@/interfaces/bookAvailability.enum';

const bookSchema = new Schema<Book>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published_year: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  availability: {
    type: BookAvailability,
    default: BookAvailability.AVAILABLE,
    required: true,
  }
});

// creation of book model
const bookModel = model<Book>('Book', bookSchema);

export { bookModel };
