import IFacebookLoginStatusResponse from 'models/response/facebook/IFacebookLoginStatusResponse';
import IGetFacebookPagesResponse from 'models/response/facebook/IFacebookGetPagesResponse';
import IFacebookGetUserfromLogin from 'models/response/facebook/IFacebookGetUserFromLogin';
import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';
import IFacebookSchedulePost from 'models/request/facebook/IFacebookSchedulePosts';
import IFaceboookGetScheduledPostResoponse from 'models/response/facebook/IFaceboookGetScheduledPostResoponse';

interface IExternalLoginService {
  getLoginStatus: () => IFacebookLoginStatusResponse;
  loginAsync: () => Promise<IFacebookGetUserfromLogin>;
  getPagesAsync: (
    userId: string,
    accesToken: string,
  ) => Promise<IGetFacebookPagesResponse>;
  postAsync: (model: IFBPostRequest) => Promise<any>;
  logoutAsync: () => Promise<any>;
  generatePostUrl: (postId: string) => string;
  schedulePostAsync: (model: IFacebookSchedulePost) => Promise<any>;
  getScheduledPostsAsync: (
    pageId: string,
    pageAccessToken: string,
  ) => Promise<IFaceboookGetScheduledPostResoponse>;
}

export default IExternalLoginService;
