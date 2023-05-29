import IFacebookLoginStatusResponse from 'models/response/facebook/IFacebookLoginStatusResponse';
import IGetFacebookPagesResponse from 'models/response/facebook/IFacebookGetPagesResponse';
import IFacebookGetUserfromLogin from 'models/response/facebook/IFacebookGetUserFromLogin';

interface IExternalLoginService {
  getLoginStatus: () => IFacebookLoginStatusResponse;
  loginAsync: () => Promise<IFacebookGetUserfromLogin>;
  getPagesAsync: (
    userId: string,
    accesToken: string,
  ) => Promise<IGetFacebookPagesResponse>;
  postAsync: (
    text: string,
    pageId: string,
    pageAccessToken: string,
  ) => Promise<any>;
  logoutAsync: () => Promise<any>;
  generatePostUrl: (postId: string) => string;
  schedulePostAsync: (
    text: string,
    pageId: string,
    pageAccessToken: string,
    publishDate: number,
  ) => Promise<any>;
}

export default IExternalLoginService;
