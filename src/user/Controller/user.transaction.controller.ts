import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth.guards';
import { BorrowBookDto } from '../Dto/borrow-book.dto';
import { BorrowTransactionService } from '../Service/borrow-transaction.service';
import { ReturnBookDto } from '../Dto/return-book.dto';

@UseGuards(AuthGuard)
@Controller('transactions')
export class UserTransactionBorrowController {
  constructor(
    private readonly _borrowTransactionService: BorrowTransactionService,
  ) {}

  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto, @Request() req) {
    const { bookId, dueDate } = borrowBookDto;
    const userId = String(req.user.userId);
    return this._borrowTransactionService.borrowBook(userId, bookId, dueDate);
  }

  @Post('return')
  @HttpCode(200)
  async returnBook(@Body() returnBookDto: ReturnBookDto, @Request() req) {
    const { bookId } = returnBookDto;
    const userId = String(req.user.userId);
    return this._borrowTransactionService.returnBook(userId, bookId);
  }
}
