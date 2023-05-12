import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const useFBLogout = (
  externalLoginService: IExternalLoginService,
): (() => void) => {
  const [isLogged, setIsLogged] = useState<boolean>(true);

  const logout = () =>
    externalLoginService.logoutAsync().then(() => setIsLogged(false));

  return logout;
};

export default useFBLogout;
