import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { BorrowTransaction } from '../Schmea/borrow-transactions.schema';
import { IBorrowTransactionRepository } from '../../Interface/Database/Repository/book-transaction-repository.interface';

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
}
