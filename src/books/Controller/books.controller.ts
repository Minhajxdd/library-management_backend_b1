import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from '../Service/books.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CreateBookDto } from '../Dto/create-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ })
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() createBookDto: CreateBookDto,
  ) {
    return this.booksService.create(file, createBookDto);
  }
}
