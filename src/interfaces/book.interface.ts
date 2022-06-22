import { BookAvailability } from "./bookAvailability.enum";

export interface Book {
  _id: string;
  title: string;
  description: string;
  genre: string;
  author: string;
  published_year: number;
  quantity: number;
  // availability: BookAvailability;
}
