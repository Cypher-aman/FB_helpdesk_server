import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const initServer = async () => {
  const app = express();

  app.use(cors());

  const server = new ApolloServer({
    typeDefs: `
    type Query {
        sayHello: String
    } 
    `,
    resolvers: {
      Query: {
        sayHello: () => 'Hello World',
      },
    },
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  return app;
};

export default initServer;
