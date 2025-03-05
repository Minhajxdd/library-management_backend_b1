import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { Book } from '../Schmea/book.schmea';
import { IBooksRepository } from '../../Interface/Repository/books-repository.interface';

@Injectable()
export class BooksRepository
  extends GenericRepository<Book>
  implements IBooksRepository
{
  constructor(@InjectModel(Book.name) private _booksModel: Model<Book>) {
    super(_booksModel);
  }
}
