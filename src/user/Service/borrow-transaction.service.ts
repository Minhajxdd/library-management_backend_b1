import { Injectable } from '@nestjs/common';

@Injectable()
export class BorrowTransactionService {
  
  
    async borrowBook(userId: string, bookId: string, dueDate: Date) {
    const activeTransactions =
      await this.borrowTransactionRepository.findActiveByUser(userId);

    if (activeTransactions.length >= this.BORROW_LIMIT) {
      throw new BadRequestException('Borrow limit reached');
    }

    return this.borrowTransactionRepository.create({
      user: userId,
      book: bookId,
      dueDate,
      status: 'borrowed',
    });
  }
}
