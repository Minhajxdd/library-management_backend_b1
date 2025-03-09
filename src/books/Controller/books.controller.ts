import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from '../Service/books.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CreateBookBody, CreateBookDto } from '../Dto/create-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly _booksService: BooksService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._booksService.findOne(id);
  }

  @Get()
  findAll(
    @Query() query: any,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this._booksService.findAll(query, Number(page), Number(limit));
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
    @Body() createBookDto: CreateBookBody,
  ) {
    const data: CreateBookDto = {
      title: createBookDto.title,
      author: createBookDto.author,
      description: createBookDto.description,
      quantity: Number(createBookDto.quantity),
    };
    data.quantity = Number(data.quantity);

    return this._booksService.create(file, data);
  }

  @Put('block/:id')
  toggleBlock(@Param('id') id: string) {
    return this._booksService.toggleBlock(id);
  }
}
