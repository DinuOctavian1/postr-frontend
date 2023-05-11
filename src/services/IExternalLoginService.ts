import IFBLoginStatusResponse from 'models/response/facebook/IFBLoginStatusResponse';
import IGetFBUserfromLogin from 'models/response/facebook/IGetFBUserFromLogin';

interface IExternalLoginService {
  getLoginStatus: () => IFBLoginStatusResponse;
  login: () => IGetFBUserfromLogin;
}

export default IExternalLoginService;
