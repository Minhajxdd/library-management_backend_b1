import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async getImageAndUpdate(
    id: string,
    image: string,
  ): Promise<{
    previousProfile: string;
    _id: string;
  }> {
    try {
      const book = await this._booksModel
        .findOneAndUpdate({ _id: id }, { $set: { image } }, { new: false })
        .lean();

      if (!book) {
        throw new BadRequestException('Invalid Request');
      }

      return { previousProfile: book.image, _id: String(book._id) };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new InternalServerErrorException();
    }
  }

  async toggleBlock(book: Book): Promise<void> {
    try {
      const { _id, isBlocked } = book;

      await this._booksModel.findOneAndUpdate(
        {
          _id,
        },
        {
          $set: {
            isBlocked: !isBlocked,
          },
        },
      );
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
