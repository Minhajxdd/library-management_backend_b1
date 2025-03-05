import { Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../Service/auth.service';
import { Response } from 'express';
import { RegisterDto } from '../Dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(registerData: RegisterDto, @Res() res: Response) {
    return this.authService.register(registerData, res);
  }
}
