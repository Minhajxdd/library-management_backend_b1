import { BorrowTransaction } from '../../../Database/Schmea/borrow-transactions.schema';
import { IGenericRepository } from './generic-repository.interface';

export interface IBorrowTransactionRepository
  extends IGenericRepository<BorrowTransaction> {
  upsertBookToTransaction(
    userId: string,
    newBook: { bookId: string; dueDate: Date; status: string },
  ): Promise<BorrowTransaction>;

  updateBookStatus(
    transactionId: string,
    bookId: string,
  ): Promise<BorrowTransaction | null>;
}
