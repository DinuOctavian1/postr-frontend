import apiAgent from 'api/ApiAgent';
import IEmailConfirmationRequest from 'models/request/IEmailConfirmationRequest';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ROUTE from 'routes/route';
import state from 'utils/state';

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [, setUser] = useAtom(state.user);
  const navigate = useNavigate();

  const emailConfirmationModel: IEmailConfirmationRequest = {
    userId: searchParams.get('userid'),
    token: searchParams.get('token'),
  };

  useEffect(() => {
    apiAgent.Account.confirmEmail(emailConfirmationModel)
      .then((rsp) => {
        toast.success(rsp.message);
        setUser(rsp.data);
        // storageService.set('ISLOGGED', true);
      })
      .catch((rsp) => {
        toast.error(rsp.message);
      })
      .finally(() => {
        navigate(ROUTE.Home);
      });
  }, []);

  return <></>;
};

export default EmailConfirmation;
