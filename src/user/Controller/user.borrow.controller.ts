import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { BorrowService } from '../Service/borrow.service';
import { AuthGuard } from 'src/guards/auth.guards';

@UseGuards(AuthGuard)
@Controller('borrow')
export class UserBorrowController {
  constructor(private readonly _borrowService: BorrowService) {}

  @Get()
  getAll(@Request() req) {
    const userId = String(req.user.userId);
    return this._borrowService.getTransactions(userId);
  }
}
