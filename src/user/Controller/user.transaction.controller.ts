import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from '../user.service';
import { AuthGuard } from 'src/guards/auth.guards';

@UseGuards(AuthGuard)
@Controller('user/borrow')
export class UserBorrowController {
  constructor(private readonly userService: UserService) {}
}
