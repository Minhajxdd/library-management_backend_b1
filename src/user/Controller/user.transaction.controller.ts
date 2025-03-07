import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth.guards';
import { BorrowBookDto } from '../Dto/borrow-book.dto';
import { BorrowTransactionService } from '../Service/borrow-transaction.service';

@UseGuards(AuthGuard)
@Controller('transactions')
export class UserBorrowController {
  constructor(
    private readonly _borrowTransactionService: BorrowTransactionService,
  ) {}

  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto, @Request() req) {
    const { bookId, dueDate } = borrowBookDto;
    const userId = String(req.user.userId);
    return this._borrowTransactionService.borrowBook(userId, bookId, dueDate);
  }
}
