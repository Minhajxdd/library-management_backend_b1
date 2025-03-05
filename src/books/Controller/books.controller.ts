import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BooksService } from '../Service/books.service';
import { AuthGuard } from 'src/guards/auth.guards';

@UseGuards(AuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(
    @Query() query: any,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.booksService.findAll(query, Number(page), Number(limit));
  }
}
