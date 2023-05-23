import IFacebookGetUserfromLogin from 'models/response/facebook/IFacebookGetUserFromLogin';
import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const useFbLogin = (
  externalLoginService: IExternalLoginService,
): { login: () => void; fbUser: IFacebookGetUserfromLogin } => {
  const [fbUser, setFbuser] = useState<IFacebookGetUserfromLogin>(null);

  const login = () => {
    externalLoginService.loginAsync().then((res) => {
      console.log(res);
      setFbuser(res);
    });
  };

  return { login, fbUser };
};

export default useFbLogin;
