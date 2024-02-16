import UserServices from '../services/user';
import { ContextType, SigninInput, User } from '../utils/interfaces';

const queries = {
  signin: (
    parent: any,
    { payload }: { payload: SigninInput },
    ctx: ContextType
  ) => {
    return UserServices.signin(payload, ctx);
  },
};

const mutations = {
  createUser: async (_parent: any, { payload }: { payload: User }) => {
    return await UserServices.createUser(payload);
  },
};

export const resolvers = { queries, mutations };
