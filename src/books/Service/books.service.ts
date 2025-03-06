import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IBooksRepository } from '../Interface/Repository/books-repository.interface';
import { Book } from '../Database/Schmea/book.schmea';
import { CreateBookDto } from '../Dto/create-book.dto';
import { IImageStorageUtils } from '../Interface/Utils/image_storage-util.interface';
import { IFileUtils } from '../Interface/Utils/file-utils.interface';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BooksRepository')
    private readonly _booksRepository: IBooksRepository,
    @Inject('ImageStorageUtils')
    private readonly _ImageStorageUtils: IImageStorageUtils,
    @Inject('FileUtils')
    private readonly _fileUtils: IFileUtils,
  ) {}

  findAll(
    query: any,
    page = 1,
    limit = 10,
  ): Promise<{
    data: Book[];
    total: number;
  }> {
    return this._booksRepository.findAll(query, page, limit);
  }

  async create(file: Express.Multer.File, createBookDto: CreateBookDto) {
    const { title, author, quantity } = createBookDto;

    const existingBook = await this._booksRepository.findOne({ title });

    if (existingBook) {
      throw new BadRequestException('A book with this title already exists');
    }

    const query = {
      title,
      author,
      quantity,
    };

    if (createBookDto.description) {
      query['description'] = createBookDto.description;
    }

    const { _id } = await this._booksRepository.create(query);

    const { secure_url } = await this._ImageStorageUtils.uploadImage(file);

    const { previousProfile } = await this._booksRepository.getImageAndUpdate(
      String(_id),
      secure_url,
    );

    // Cleanup woks in the backgound removing from cloud and local
    if (previousProfile) {
      this._ImageStorageUtils.deleteImage(previousProfile);
    }

    this._fileUtils.deleteFile(file.path);

    return {
      status: 'success',
      message: 'updated successfully',
      data: {
        imageUrl: secure_url,
      },
    };
  }

  async findOne(id: string) {
    return this._booksRepository.findById(id);
  }
}
