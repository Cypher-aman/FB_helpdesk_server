import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import User from './user';
import { ContextType } from './utils/interfaces';
import JWTServices from './services/jwt';

const initServer = async () => {
  const app = express();

  app.use(cors());

  const server = new ApolloServer<ContextType>({
    typeDefs: `

    ${User.types}

    type Query {
        ${User.quries}
    } 

    type Mutation {
        ${User.mutations}
    }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          userSignature: req.headers.authorization
            ? JWTServices.verifySigninToken(
                req.headers.authorization.split('Bearer ')[1]
              )
            : null,
        };
      },
    })
  );

  return app;
};

export default initServer;
