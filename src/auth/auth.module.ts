import { Module } from '@nestjs/common';
import { AuthService } from './Service/auth.service';
import { AuthController } from './Controller/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Database/Schemea/user.schmea';

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
  providers: [AuthService],
})
export class AuthModule {}
