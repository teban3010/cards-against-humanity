import 'graphql-import-node';

import { ApolloServer } from 'apollo-server-micro';
import mongoose from 'mongoose';
import resolvers from 'graphql/resolvers';
import typeDefs from 'graphql/schema.graphql';

let db;

const apolloServer = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers,
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: any, res: any) => {
  if (!db) {
    try {
      db = mongoose.connect(process.env.MONGO_URL);
    } catch (e) {
      console.log('--->error while connecting via graphql context (db)', e);
    }
  }

  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};

export default handler;
