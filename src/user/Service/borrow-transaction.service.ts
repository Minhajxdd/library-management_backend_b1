import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IBorrowTransactionRepository } from '../Interface/Database/Repository/book-transaction-repository.interface';

@Injectable()
export class BorrowTransactionService {
  private readonly BORROW_LIMIT = 5;

  constructor(
    @Inject('BorrowTransactionRepository')
    private readonly _borrowTransactionRepository: IBorrowTransactionRepository,
  ) {}

  async borrowBook(userId: string, bookId: string, dueDate: string) {
    const transaction = await this._borrowTransactionRepository.findOne({
      userId,
    });

    if (transaction) {
      const foundBook = transaction.books.find(
        (b) => b.bookId.toString() === bookId && b.status === 'borrowed',
      );

      if (foundBook) {
        throw new BadRequestException('Book Already Exists');
      }

      const activeBorrowCount = transaction.books.filter(
        (b) => b.status === 'borrowed',
      ).length;

      if (activeBorrowCount + 1 > this.BORROW_LIMIT) {
        throw new BadRequestException('Borrow limit exceeded');
      }
    }

    const newBook = {
      bookId,
      dueDate: new Date(dueDate),
      status: 'borrowed',
    };

    await this._borrowTransactionRepository.upsertBookToTransaction(
      userId,
      newBook,
    );

    return {
      status: 'success',
      message: 'successfully borrowed books',
    };
  }
}
