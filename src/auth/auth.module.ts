import { Module } from '@nestjs/common';
import { AuthService } from './Service/auth.service';
import { AuthController } from './Controller/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Database/Schemea/user.schmea';
import { UserRepository } from './Database/Repository/user.repository';
import { PasswordUtils } from './Utils/password.utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
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
    AuthService,
  ],
})
export class AuthModule {}
