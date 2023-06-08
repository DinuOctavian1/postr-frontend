import apiAgent from 'api/ApiAgent';
import IFacebookLoginStatusResponse from 'models/response/facebook/IFacebookLoginStatusResponse';
import IGetFacebookPagesResponse from 'models/response/facebook/IFacebookGetPagesResponse';
import IFacebookGetUserfromLogin from 'models/response/facebook/IFacebookGetUserFromLogin';
import IExternalLoginService from './IExternalLoginService';
import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';

class FacebookService implements IExternalLoginService {
  static readonly fbAppId: string = process.env.REACT_APP_FACEBOOK_APP_ID;
  static instance: FacebookService;
  static readonly permissions: string =
    'pages_manage_posts, pages_read_engagement';

  static getInstance() {
    if (!FacebookService.instance) {
      FacebookService.instance = new FacebookService();
    }
    return FacebookService.instance;
  }

  async getPagesAsync(
    userId: string,
    userAccesToken: string,
  ): Promise<IGetFacebookPagesResponse> {
    return await apiAgent.Facebook.getFbPages(userId, userAccesToken);
  }

  getLoginStatus(): IFacebookLoginStatusResponse {
    let response: any = {};
    FB.getLoginStatus((res) => {
      response = res;
    });

    return response;
  }

  loginAsync(): Promise<IFacebookGetUserfromLogin> {
    return new Promise((resolve, reject) => {
      FB.login(
        (resp: any) => {
          if (resp.authResponse) {
            console.log('Welcome! Fetching your information....');
            resolve(resp);
          } else {
            console.log('User cancelled login or did not fully authorize.');
            reject(new Error('Login failed.'));
          }
        },
        { scope: this.getPagePermission() },
      );
    });
  }

  async postAsync(requestModel: IFBPostRequest) {
    return await apiAgent.Facebook.postNow(requestModel);
  }

  async schedulePostAsync(
    text: string,
    pageId: string,
    pageAccessToken: string,
    publishDate: number,
  ) {
    return await apiAgent.Facebook.schedulePost(
      text,
      pageId,
      pageAccessToken,
      publishDate,
    );
  }

  getAppId = () => {
    return FacebookService.fbAppId;
  };

  getPagePermission = () => {
    return FacebookService.permissions;
  };

  logoutAsync = (): Promise<any> => {
    return new Promise((resolve) => {
      FB.logout((response) => {
        resolve(response);
        console.log(response);
      });
    });
  };

  generatePostUrl = (postId: string) => {
    return `https://www.facebook.com/${postId}`;
  };
}

export default FacebookService;
