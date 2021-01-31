import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  nickname: string;
  name: string;
  picture: string;
  email?: string;
  sub: string;
}

const schema = new Schema({
  nickname: { type: String, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  email: String,
  sub: { type: String, required: true },
});

export default (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', schema);
