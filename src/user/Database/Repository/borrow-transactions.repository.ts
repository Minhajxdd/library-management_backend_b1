import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async updateBookStatus(
    transactionId: string,
    bookId: string,
  ): Promise<BorrowTransaction | null> {
    return this._borrowTransactionModel
      .findOneAndUpdate(
        {
          _id: transactionId,
          'books.bookId': bookId,
          'books.status': 'borrowed',
        },
        {
          $set: {
            'books.$.status': 'returned',
            'books.$.returnedAt': new Date(),
          },
        },
        { new: true },
      )
      .exec();
  }

  getBooksByPopulate(userId: string) {
    return this._borrowTransactionModel
      .findOne(
        { userId, 'books.status': 'borrowed' },
        {
          books: { $elemMatch: { status: 'borrowed' } },
        },
      )
      .populate('books.bookId');
  }
}
