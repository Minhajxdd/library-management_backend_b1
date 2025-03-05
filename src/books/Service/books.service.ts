import { Inject, Injectable } from '@nestjs/common';
import { IBooksRepository } from '../Interface/Repository/books-repository.interface';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BooksRepository')
    private readonly _booksRepository: IBooksRepository,
  ) {}

  findAll(query: any, page = 1, limit = 10) {
    return this._booksRepository.findAll(query, page, limit);
  }
}
