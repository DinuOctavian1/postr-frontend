import apiAgent from 'api/ApiAgent';
import IFBLoginStatusResponse from 'models/response/facebook/IFBLoginStatusResponse';
import IGetFacebookPagesResponse from 'models/response/facebook/IGetFBPagesResponse';
import IGetFBUserfromLogin from 'models/response/facebook/IGetFBUserFromLogin';
import IExternalLoginService from './IExternalLoginService';

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

  getLoginStatus(): IFBLoginStatusResponse {
    let response: any = {};
    FB.getLoginStatus((res) => {
      response = res;
    });

    return response;
  }

  login(): IGetFBUserfromLogin {
    let response: any = {};
    FB.login(
      (resp) => {
        response = resp;
        if (resp.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: this.getPagePermission() },
    );
    return response;
  }

  async postAsync(text: string, pageId: string, pageAccessToken: string) {
    return await apiAgent.Facebook.createPost(text, pageId, pageAccessToken);
  }

  getAppId = () => {
    return FacebookService.fbAppId;
  };

  getPagePermission = () => {
    return FacebookService.permissions;
  };

  logout = async () => {
    await new Promise((resolve) => {
      // FacebookLogin.logout((response) => {
      //   resolve(response);
      // });
    });
  };
}

export default FacebookService;
