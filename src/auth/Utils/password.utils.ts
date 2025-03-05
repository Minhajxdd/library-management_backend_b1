import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordUtils {
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  verifyPassword(pword1: string, pword2: string) {
    return bcrypt.compare(pword1, pword2);
  }
}
