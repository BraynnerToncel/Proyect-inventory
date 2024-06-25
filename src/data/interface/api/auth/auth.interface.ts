import { IUser } from '../user/user.interface';

export interface IJwtToken extends IUser {}

export interface IAuthDecodedUser extends IJwtToken {
  iat: number;
  exp: number;
}

export interface IAuth {
  username: string;
  password: string;
  remember?: boolean;
}

export interface IAuthenticatedUser {
  token: string;
}
