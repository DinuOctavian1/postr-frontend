import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import IFBLoginStatusResponse from 'models/response/facebook/IFBLoginStatusResponse';
import IExternalLoginService from 'services/IExternalLoginService';

const useFBGetLoginStatus = (
  extenalLoginService: IExternalLoginService,
): IFBLoggedUser => {
  const loggedUser: IFBLoggedUser = {
    token: '',
    userId: '',
    isLogged: false,
  };

  const response: IFBLoginStatusResponse = extenalLoginService.getLoginStatus();

  if (response.status === 'connected' && response.authResponse) {
    loggedUser.token = response?.authResponse?.accessToken;
    loggedUser.userId = response?.authResponse?.userID;
    loggedUser.isLogged = true;
  }

  return loggedUser;
};

export default useFBGetLoginStatus;
