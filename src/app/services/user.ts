import { db } from '../../clients';
import bcrypt from 'bcrypt';
import { SigninInput, User } from '../utils/interfaces';
import { GraphQLError } from 'graphql';
import JWTServices from './jwt';

export default class UserServices {
  static async createUser(data: User) {
    try {
      const { name, email, password, profilePicture } = data;

      const user = await db.user.findFirst({
        where: {
          email,
        },
      });

      if (user) {
        throw new GraphQLError('User already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            http: { status: 400 },
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return 'Signed up successfully';
    } catch (error: any) {
      return error;
    }
  }

  static async signin(payload: SigninInput, ctx: any) {
    const { email, password } = payload;
    try {
      const user = await db.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
            http: { status: 400 },
          },
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
            http: { status: 400 },
          },
        });
      }

      const signinToken = JWTServices.generateSigninToken(user.id, user.email);

      return signinToken;
    } catch (error) {
      return error;
    }
  }
}
