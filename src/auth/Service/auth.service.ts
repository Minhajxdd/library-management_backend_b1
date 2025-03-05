import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '../Dto/register.dto';
import { IUserRepository } from '../Interface/Repository/user-repository.interface';
import { IPasswordUtils } from '../Interface/Utils/password-utils.interface';
import { ICookieUtils } from '../Interface/Utils/cookie-utils.respository';
import { ITokenUtils } from '../Interface/Utils/token-utils.repository';
import { Response } from 'express';
import { IAuthService } from '../Interface/Service/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('UserRepository')
    private readonly _userRepository: IUserRepository,
    @Inject('PasswordUtils')
    private readonly _passwordUtils: IPasswordUtils,
    @Inject('CookieUtils')
    private readonly _cookieUtils: ICookieUtils,
    @Inject('TokenUtils')
    private readonly _tokenUtils: ITokenUtils,
  ) {}

  async register(registerData: RegisterDto, res: Response): Promise<void> {
    const { email, password, fullName } = registerData;

    const emailInUse = await this._userRepository.findOne({ email });

    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    const hashPassword = await this._passwordUtils.hashPassword(password);

    const user = await this._userRepository.create({
      fullName,
      email,
      password: hashPassword,
    });

    const { accessToken, refreshToken } = await this._tokenUtils.GenerateTokens(
      String(user._id),
    );

    this._cookieUtils.setCookie(res, [
      {
        name: 'refresh_token',
        value: refreshToken,
      },
      {
        name: 'access_token',
        value: accessToken,
        options: { maxAge: 5 * 60 * 1000 },
      },
    ]);

    res.json({
      status: 'sucess',
      message: 'successfully user Registered',
    });
  }
}
