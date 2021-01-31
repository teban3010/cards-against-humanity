import mongoose, { Document, Schema } from 'mongoose';

import { User } from './user';

export interface Card {
  id: string;
  description: string;
}

export interface BlackCard extends Card {
  cardsToDraw: number;
}

export interface Deck extends Document {
  name: string;
  language: string;
  createdBy?: User['_id'];
  public: boolean;
  cards: Array<Card>;
  blackCards: Array<BlackCard>;
}

const schema = new Schema({
  name: { type: String, required: true },
  language: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  public: { type: Boolean, required: true, default: false },
  cards: [{ id: String, description: String }],
  blackCards: [{ id: String, description: String, cardsToDraw: Number }],
});

export default (mongoose.models.Deck as mongoose.Model<Deck>) ||
  mongoose.model<Deck>('Deck', schema);
