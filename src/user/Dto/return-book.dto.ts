import { IsNotEmpty, IsString } from 'class-validator';

export class ReturnBookDto {
  @IsString()
  @IsNotEmpty()
  bookId: string;
}
