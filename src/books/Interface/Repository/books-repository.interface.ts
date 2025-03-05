import { Book } from '../../Database/Schmea/book.schmea';
import { IGenericRepository } from './generic-repository.interface';

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IBooksRepository extends IGenericRepository<Book> {}
