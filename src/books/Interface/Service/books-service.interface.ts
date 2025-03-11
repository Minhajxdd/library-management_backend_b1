import { CreateBookDto } from 'src/books/Dto/create-book.dto';
import { Book } from '../../Database/Schmea/book.schmea';

export interface IBooksService {
  findAll(
    query: any,
    page?: number,
    limit?: number,
  ): Promise<{
    data: Book[];
    total: number;
  }>;

  create(file: Express.Multer.File, createBookDto: CreateBookDto);

  findOne(id: string): Promise<Book>;

  toggleBlock(id: string);
}
