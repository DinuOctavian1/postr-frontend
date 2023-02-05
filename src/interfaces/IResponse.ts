import IUser from './IUser';

export default interface IResponse {
    message: string;
    isSuccess: boolean;
    errors: string[];
    twoFactorAuth?: boolean;
    user?: IUser;
}
