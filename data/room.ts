import mongoose, { Document, Schema } from 'mongoose';

import { IBlackCard } from './blackCard';
import { ICard } from './card';
import { IPlayer } from './player';

export interface IRoom extends Document {
  name: string;
  callLink?: string;
  game: {
    mode: string;
    status: string;
    players: number;
    activeBlackCard: IBlackCard['_id'];
    cards: Array<ICard['_id']>;
    blackCards: Array<IBlackCard['_id']>;
  };
  players: Array<IPlayer['_id']>;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  callLink: {
    type: String,
  },
  game: {
    mode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    activeBlackCard: {
      type: Schema.Types.ObjectId,
      ref: 'BlackCard',
    },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
    blackCards: [{ type: Schema.Types.ObjectId, ref: 'BlackCard' }],
  },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
});

export default (mongoose.models.Room as mongoose.Model<IRoom>) ||
  mongoose.model<IRoom>('Room', schema);
