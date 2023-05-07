import IUser from 'interfaces/IUser';
import { useAtom } from 'jotai';
import IAuthResponse from 'models/response/IAuthResponse';
import { useState } from 'react';
import state from 'utils/state';

const useGetCurrentUser = (apiAgent): [() => void, IUser, boolean] => {
  const [user, setUser] = useAtom(state.user);
  const [isloading, setIsLoading] = useState<boolean>(true);

  const getCurrentUser = (): void => {
    apiAgent.Account.getCurrentUser()
      .then((rsp: IAuthResponse) => {
        if (rsp?.data) {
          setUser(rsp?.data);
        } else {
          setUser(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return [getCurrentUser, user, isloading];
};

export default useGetCurrentUser;
