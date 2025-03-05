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

  async findAll(
    query: any,
    page: number,
    limit: number,
  ): Promise<{ data: Book[]; total: number }> {
    const filter: any = {};
    if (query.search) {
      filter['$or'] = [
        { title: new RegExp(query.search, 'i') },
        { author: new RegExp(query.search, 'i') },
      ];
    }

    if (query.description)
      filter['description'] = new RegExp(query.description, 'i');

    const total = await this._booksModel.countDocuments(filter);

    const data = await this._booksModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    return { data, total };
  }
}
