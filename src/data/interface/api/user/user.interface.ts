export interface IUser {
  userId: string;
  username: string;
  userPassword: string;
  role: string;
}

export type IUserFindCondition = Partial<Pick<IUser, 'userId' | 'username'>>;

export type ICreateUser = Omit<IUser, 'userId'>;

export type IUpdateUser = Partial<ICreateUser> &
  Partial<Record<'newPassword', string>>;
