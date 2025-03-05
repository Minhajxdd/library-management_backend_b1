import { Module } from '@nestjs/common';
import { AuthService } from './Service/auth.service';
import { AuthController } from './Controller/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Database/Schemea/user.schmea';
import { UserRepository } from './Database/Repository/user.repository';
import { PasswordUtils } from './Utils/password.utils';
import { CookieUtils } from './Utils/cookie.utils';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './Database/Schemea/refresh-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'PasswordUtils',
      useClass: PasswordUtils,
    },
    {
      provide: 'CookieUtils',
      useClass: CookieUtils,
    },
    AuthService,
  ],
})
export class AuthModule {}
