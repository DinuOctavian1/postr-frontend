import IUser from 'models/interfaces/IUser';
import IApiResponse from './IApiResponse';

type IAuthResponse = IApiResponse<IUser>;

export default IAuthResponse;
