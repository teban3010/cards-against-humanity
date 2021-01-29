import mongoose, { Document, Schema } from 'mongoose';

export interface ICard extends Document {
  description: string;
  language: string;
  deck: string;
}

const schema = new Schema({
  description: {
    type: String,
    required: true,
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

export default (mongoose.models.Card as mongoose.Model<ICard>) ||
  mongoose.model<ICard>('Card', schema);
