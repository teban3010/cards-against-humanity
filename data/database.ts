import mongoose from 'mongoose';

let db;

export const connectDB = () => {
  if (!db) {
    try {
      db = mongoose.connect(process.env.MONGO_URL);
    } catch (e) {
      console.log('--->error while connecting via graphql context (db)', e);
    }
  }

  return db;
};
