import 'graphql-import-node';

import { ApolloServer } from 'apollo-server-micro';
import { connectDB } from 'data/database';
import resolvers from 'graphql/resolvers';
import typeDefs from 'graphql/schema.graphql';

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
  connectDB();

  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};

export default handler;
