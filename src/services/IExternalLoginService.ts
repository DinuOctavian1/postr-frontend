import IFBLoginStatusResponse from 'models/response/facebook/IFBLoginStatusResponse';
import IGetFacebookPagesResponse from 'models/response/facebook/IGetFBPagesResponse';
import IGetFBUserfromLogin from 'models/response/facebook/IGetFBUserFromLogin';

interface IExternalLoginService {
  getLoginStatus: () => IFBLoginStatusResponse;
  login: () => IGetFBUserfromLogin;
  getPagesAsync: (
    userId: string,
    accesToken: string,
  ) => Promise<IGetFacebookPagesResponse>;
  postAsync: (
    text: string,
    pageId: string,
    pageAccessToken: string,
  ) => Promise<any>;
  logout: () => void;
}

export default IExternalLoginService;
