import mongoose, { Document, Schema } from 'mongoose';

import { ICard } from './card';

export interface IBlackCard extends ICard {
  cardsToDraw: number;
}

const schema = new Schema({
  description: {
    type: String,
    required: true,
  },
  cardsToDraw: {
    type: Number,
    required: true,
    default: 1,
  },
  language: {
    type: String,
    required: true,
  },
  deck: {
    type: String,
    required: true,
  },
});

export default (mongoose.models.BlackCard as mongoose.Model<IBlackCard>) ||
  mongoose.model<IBlackCard>('BlackCard', schema);
