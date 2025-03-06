import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './Controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
