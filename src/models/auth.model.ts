import { Types } from 'mongoose';

export interface AuthPayload {
  username: string;
  email: string | undefined;
  roles: Types.ObjectId[];
};