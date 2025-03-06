import { Module } from '@nestjs/common';
import { BooksService } from './Service/books.service';
import { BooksController } from './Controller/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './Database/Schmea/book.schmea';
import { BooksRepository } from './Database/Repository/books.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ClaudinaryStorageUtils } from './Utils/claudinary-storage.utils';
import { FileUtils } from './Utils/file.utils';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/profiles',
    }),
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
    {
      provide: 'ImageStorageUtils',
      useClass: ClaudinaryStorageUtils,
    },
    {
      provide: 'FileUtils',
      useClass: FileUtils,
    },
  ],
})
export class BooksModule {}
