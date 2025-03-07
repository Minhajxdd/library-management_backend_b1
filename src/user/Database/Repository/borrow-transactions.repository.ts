import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { IBorrowTransactionRepository } from '../../Interface/Database/Repository/book-transaction-repository.interface';
import { BorrowTransaction } from '../Schmea/borrow-transactions.schema';

@Injectable()
export class BorrowTransactionRepository
  extends GenericRepository<BorrowTransaction>
  implements IBorrowTransactionRepository
{
  constructor(
    @InjectModel(BorrowTransaction.name)
    private _borrowTransactionModel: Model<BorrowTransaction>,
  ) {
    super(_borrowTransactionModel);
  }

  async upsertBookToTransaction(
    userId: string,
    newBook: { bookId: string; dueDate: Date; status: string },
  ): Promise<BorrowTransaction> {
    return this._borrowTransactionModel
      .findOneAndUpdate(
        { userId },
        { $addToSet: { books: newBook } },
        { upsert: true, new: true },
      )
      .exec();
  }
}
