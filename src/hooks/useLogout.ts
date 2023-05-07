import IAuthResponse from 'models/response/IAuthResponse';
import { useState } from 'react';

const useLogout = (apiAgent, toast): [() => void, boolean] => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const logout = () => {
    apiAgent.Account.logout()
      .then((rsp: IAuthResponse) => {
        toast.success(rsp.message);
        setIsLogged(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return [logout, isLogged];
};

export default useLogout;
