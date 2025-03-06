import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BorrowTransaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ default: null })
  returnedAt: Date;

  @Prop({ required: true, enum: ['borrowed', 'returned'], default: 'borrowed' })
  status: string;
}

export const BorrowTransactionSchema =
  SchemaFactory.createForClass(BorrowTransaction);
