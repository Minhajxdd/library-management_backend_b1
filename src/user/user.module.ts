import { Module } from '@nestjs/common';
import { BorrowTransactionService } from './borrow-transaction.service';
import { UserBorrowController } from './Controller/user.transaction.controller';

@Module({
  controllers: [UserBorrowController],
  providers: [BorrowTransactionService],
})
export class UserModule {}
