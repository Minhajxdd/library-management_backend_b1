import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IBorrowTransactionRepository } from '../Interface/Database/Repository/book-transaction-repository.interface';

@Injectable()
export class BorrowService {
  constructor(
    @Inject('BorrowTransactionRepository')
    private readonly _borrowTransactionRepository: IBorrowTransactionRepository,
  ) {}

  async getTransactions(userId: string) {
    const transactions =
      await this._borrowTransactionRepository.getBooksByPopulate(userId);

    if (!transactions) {
      throw new BadRequestException('Borrow is Empty');
    }

    return {
      status: 'success',
      message: 'successfully fetched data',
      data: transactions.books,
    };
  }
}
