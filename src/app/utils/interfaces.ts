import { Express } from 'express';

export interface User {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  accessToken?: string;
}

export interface SigninInput {
  email: string;
  password: string;
}

interface _userSignature {
  id: string;
  email: string;
}
export interface ContextType {
  userSignature?: _userSignature;
}
