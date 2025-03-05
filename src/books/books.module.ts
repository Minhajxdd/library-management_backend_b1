import { Module } from '@nestjs/common';
import { BooksService } from './Service/books.service';
import { BooksController } from './Controller/books.controller';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
