import IGetFBUserfromLogin from 'models/response/facebook/IGetFBUserFromLogin';
import { useState } from 'react';

const useFbLogin = (
  facebookService: any,
): { login: () => void; fbUser: IGetFBUserfromLogin } => {
  const [fbUser, setFbuser] = useState<IGetFBUserfromLogin>();

  const login = () => {
    setFbuser(facebookService.login());
  };

  return { login, fbUser };
};

export default useFbLogin;
