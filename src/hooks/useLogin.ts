import { useAtom } from 'jotai';
import ILoginRequest from 'models/request/ILoginRequest';
import IAuthResponse from 'models/response/IAuthResponse';
import { useState } from 'react';
import state from 'utils/state';

const useLogin = (
  apiAgent,
  toast,
): [(model: ILoginRequest) => void, boolean] => {
  const [user, setUser] = useAtom(state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (model: ILoginRequest): void => {
    apiAgent.Account.login(model)
      .then((rsp: IAuthResponse) => {
        toast.success(rsp.message);
        setUser(rsp.data);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  return [login, isLoading];
};

export default useLogin;
