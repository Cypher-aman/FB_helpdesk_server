import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import User from './user';

const initServer = async () => {
  const app = express();

  app.use(cors());

  const server = new ApolloServer({
    typeDefs: `

    ${User.types}

    type Query {
        sayHello: String
    } 

    type Mutation {
        ${User.mutations}
    }
    `,
    resolvers: {
      Query: {
        sayHello: () => 'Hello World!',
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  return app;
};

export default initServer;
