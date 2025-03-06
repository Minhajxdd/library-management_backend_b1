import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { BorrowTransaction } from '../Schmea/borrow-transactions.schema';

@Injectable()
export class BooksRepository extends GenericRepository<BorrowTransaction> {
  constructor(
    @InjectModel(BorrowTransaction.name)
    private _borrowTransactionModel: Model<BorrowTransaction>,
  ) {
    super(_borrowTransactionModel);
  }
}
