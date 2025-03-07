import { Module } from '@nestjs/common';
import { BorrowTransactionService } from './Service/borrow-transaction.service';
import { UserBorrowController } from './Controller/user.transaction.controller';
import { BorrowTransactionRepository } from './Database/Repository/borrow-transactions.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BorrowTransaction,
  BorrowTransactionSchema,
} from './Database/Schmea/borrow-transactions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BorrowTransaction.name,
        schema: BorrowTransactionSchema,
      },
    ]),
  ],
  controllers: [UserBorrowController],
  providers: [
    BorrowTransactionService,
    {
      provide: 'BorrowTransactionRepository',
      useClass: BorrowTransactionRepository,
    },
  ],
})
export class UserModule {}
