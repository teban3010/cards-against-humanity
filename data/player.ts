import mongoose, { Document, Schema } from 'mongoose';

import { IBlackCard } from './blackCard';
import { ICard } from './card';

export interface IPlayer extends Document {
  name: string;
  cardCzar: boolean;
  cards: Array<ICard['_id']>;
  blackCards: Array<IBlackCard['_id']>;
  selectedCards: Array<ICard['_id']>;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cardCzar: {
    type: Boolean,
    required: true,
    default: false,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  blackCards: [{ type: Schema.Types.ObjectId, ref: 'BlackCard' }],
  selectedCards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

export default (mongoose.models.Player as mongoose.Model<IPlayer>) ||
  mongoose.model<IPlayer>('Player', schema);
