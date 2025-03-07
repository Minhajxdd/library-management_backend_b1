import { IsNotEmpty, IsString } from 'class-validator';

export class BorrowBookDto {
  @IsString()
  @IsNotEmpty()
  bookId: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;
}
