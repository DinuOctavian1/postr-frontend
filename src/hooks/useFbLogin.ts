import IGetFBUserfromLogin from 'models/response/facebook/IGetFBUserFromLogin';
import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const useFbLogin = (
  externalLoginService: IExternalLoginService,
): { login: () => void; fbUser: IGetFBUserfromLogin } => {
  const [fbUser, setFbuser] = useState<IGetFBUserfromLogin>(null);

  const login = () => {
    externalLoginService.loginAsync().then((res) => {
      console.log(res);
      setFbuser(res);
    });
  };

  return { login, fbUser };
};

export default useFbLogin;
