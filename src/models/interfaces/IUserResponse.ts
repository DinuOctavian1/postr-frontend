import IUser from './IUser';

interface IUserResponse {
  message: string;
  isSuccess: boolean;
  errors: string[];
  twoFactorAuth?: boolean;
  user?: IUser;
}

export default IUserResponse;
