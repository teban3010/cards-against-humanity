import { BlackCard, Card } from './deck';
import mongoose, { Document, Schema } from 'mongoose';

import { User } from './user';

export interface Player extends Document {
  user: User['_id'];
  cardCzar: boolean;
  cards: Array<Card>;
  blackCards: Array<BlackCard>;
  selectedCards: Array<Card>;
}

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  cardCzar: { type: Boolean, required: true, default: false },
  cards: [{ id: String, description: String }],
  blackCards: [{ id: String, description: String, cardsToDraw: Number }],
  selectedCards: [{ id: String, description: String }],
});

export default (mongoose.models.Player as mongoose.Model<Player>) ||
  mongoose.model<Player>('Player', schema);
