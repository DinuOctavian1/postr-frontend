import { useAtom } from 'jotai';
import ILoginRequest from 'models/request/ILoginRequest';
import IAuthResponse from 'models/response/IAuthResponse';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTE from 'routes/route';
import state from 'utils/state';

const useLogin = (
  apiAgent,
  toast,
): [(model: ILoginRequest) => void, boolean, boolean] => {
  const [, setUser] = useAtom(state.user);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = (model: ILoginRequest): void => {
    setIsLoading(true);
    apiAgent.Account.login(model)
      .then((rsp: IAuthResponse) => {
        toast.success(rsp.message);
        setUser(rsp.data);
        setIsSuccess(true);
        navigate(ROUTE.Dashboard);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  return [login, isLoading, isSuccess];
};

export default useLogin;
