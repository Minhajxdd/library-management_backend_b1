import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BorrowTransactionDocument = BorrowTransaction & Document;

@Schema({ timestamps: true })
export class BorrowedBook {
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ default: null })
  returnedAt: Date;

  @Prop({ required: true, enum: ['borrowed', 'returned'], default: 'borrowed' })
  status: string;
}

export const BorrowedBookSchema = SchemaFactory.createForClass(BorrowedBook);

@Schema({ timestamps: false })
export class BorrowTransaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [BorrowedBookSchema], required: true })
  books: BorrowedBook[];
}

export const BorrowTransactionSchema =
  SchemaFactory.createForClass(BorrowTransaction);
