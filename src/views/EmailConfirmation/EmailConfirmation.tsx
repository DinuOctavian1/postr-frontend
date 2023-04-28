import apiAgent from 'api/agentAPI';
import IEmailConfirmationRequest from 'models/request/IEmailConfirmationRequest';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ROUTE from 'routes/route';
import state from 'utils/state';

const EmailConfirmation = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useAtom(state.user);

  const emailConfirmationModel: IEmailConfirmationRequest = {
    userId: searchParams.get('userid'),
    token: searchParams.get('token'),
  };

  useEffect(() => {
    apiAgent.Account.confirmEmail(emailConfirmationModel)
      .then((rsp: string) => {
        console.log(rsp);
        toast.success(rsp);
        //setUser(rsp?.user);
        // storageService.set('ISLOGGED', true);
      })
      .catch((rsp: string) => {
        setErrorMsg(rsp);
      })
      .finally(() => {
        navigate(ROUTE.Home);
      });
  }, []);

  return <>{errorMsg}</>;
};

export default EmailConfirmation;
