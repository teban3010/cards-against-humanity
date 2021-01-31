import { BlackCard, Card } from './deck';
import mongoose, { Document, Schema } from 'mongoose';

import { Player } from './player';
import { User } from './user';

export interface Room extends Document {
  name: string;
  callLink?: string;
  game: {
    status: string;
    activeBlackCard?: BlackCard;
    cards: Array<Card>;
    blackCards: Array<BlackCard>;
  };
  players: Array<Player['_id']>;
  owner: User['_id'];
  winners: Array<Player['_id']>;
}

const schema = new Schema({
  name: { type: String, required: true },
  callLink: String,
  game: {
    status: { type: String, required: true },
    activeBlackCard: {
      type: { id: String, description: String, cardsToDraw: Number },
      required: false,
    },
    cards: [{ id: String, description: String }],
    blackCards: [{ id: String, description: String, cardsToDraw: Number }],
  },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  winners: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    required: false,
  },
});

export default (mongoose.models.Room as mongoose.Model<Room>) ||
  mongoose.model<Room>('Room', schema);
