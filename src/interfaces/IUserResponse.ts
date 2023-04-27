import IUser from './IUser';

interface IResponse {
  message: string;
  isSuccess: boolean;
  errors: string[];
  twoFactorAuth?: boolean;
  user?: IUser;
}

export default IResponse;
