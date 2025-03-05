import { Module } from '@nestjs/common';
import { AuthService } from './Service/auth.service';
import { AuthController } from './Controller/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Database/Schemea/user.schmea';
import { UserRepository } from './Database/Repository/user.repository';

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
    AuthService,
  ],
})
export class AuthModule {}
