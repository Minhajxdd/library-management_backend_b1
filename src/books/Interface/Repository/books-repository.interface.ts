import { Book } from '../../Database/Schmea/book.schmea';
import { IGenericRepository } from './generic-repository.interface';

export interface IBooksRepository extends IGenericRepository<Book> {
  findAll(
    query: any,
    page: number,
    limit: number,
  ): Promise<{ data: Book[]; total: number }>;

  getImageAndUpdate(
    id: string,
    image: string,
  ): Promise<{
    previousProfile: string;
  }>;

  toggleBlock(book: Book): Promise<void>;
}
