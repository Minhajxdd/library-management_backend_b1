import { BorrowTransaction } from '../../../Database/Schmea/borrow-transactions.schema';
import { IGenericRepository } from './generic-repository.interface';

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IBorrowTransactionRepository
  extends IGenericRepository<BorrowTransaction> {}
