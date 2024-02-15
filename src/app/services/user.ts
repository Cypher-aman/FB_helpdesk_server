import { db } from '../../clients';
import bcrypt from 'bcrypt';
import { User } from '../utils/interfaces';

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
        throw new Error('User already exists');
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
      return error.message;
    }
  }
}
