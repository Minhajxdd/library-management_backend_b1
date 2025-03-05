import { Controller } from '@nestjs/common';
import { BooksService } from '../Service/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
}
