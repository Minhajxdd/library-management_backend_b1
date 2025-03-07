import { Module } from '@nestjs/common';
import { BorrowTransactionService } from './Service/borrow-transaction.service';
import { UserTransactionBorrowController } from './Controller/user.transaction.controller';
import { BorrowTransactionRepository } from './Database/Repository/borrow-transactions.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BorrowTransaction,
  BorrowTransactionSchema,
} from './Database/Schmea/borrow-transactions.schema';
import { UserBorrowController } from './Controller/user.borrow.controller';
import { BorrowService } from './Service/borrow.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BorrowTransaction.name,
        schema: BorrowTransactionSchema,
      },
    ]),
  ],
  controllers: [UserTransactionBorrowController, UserBorrowController],
  providers: [
    BorrowTransactionService,
    {
      provide: 'BorrowTransactionRepository',
      useClass: BorrowTransactionRepository,
    },
    BorrowService,
  ],
})
export class UserModule {}
