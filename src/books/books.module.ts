import { Module } from '@nestjs/common';
import { BooksService } from './Service/books.service';
import { BooksController } from './Controller/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './Database/Schmea/book.schmea';
import { BooksRepository } from './Database/Repository/books.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: 'BooksRepository',
      useClass: BooksRepository,
    },
  ],
})
export class BooksModule {}
