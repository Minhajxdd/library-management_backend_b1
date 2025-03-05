import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../Repository/generic.repository';
import { RefreshToken } from '../Schemea/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends GenericRepository<RefreshToken> {
  constructor(
    @InjectModel(RefreshToken.name) private _refreshToken: Model<RefreshToken>,
  ) {
    super(_refreshToken);
  }
}
