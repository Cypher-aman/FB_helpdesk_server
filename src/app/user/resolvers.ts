import UserServices from '../services/user';
import { User } from '../utils/interfaces';

const queries = {};

const mutations = {
  createUser: async (
    parent: any,
    { payload }: { payload: User },
    context: any
  ) => {
    try {
      return await UserServices.createUser(payload);
    } catch (error: any) {
      return error.message;
    }
  },
};

export const resolvers = { queries, mutations };
