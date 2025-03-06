import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserBorrowController } from './Controller/user.transaction.controller';

@Module({
  controllers: [UserBorrowController],
  providers: [UserService],
})
export class UserModule {}
