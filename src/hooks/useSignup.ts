import ISignupRequest from 'models/request/ISignupRequest';
import IAuthResponse from 'models/response/IAuthResponse';
import { useState } from 'react';

const useSignup = (
  apiAgent,
  toast,
): [(values: ISignupRequest) => void, boolean] => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = (values: ISignupRequest): void => {
    setIsSubmitting(true);
    apiAgent.Account.signup(values)
      .then((rsp: IAuthResponse) => {
        toast.success(rsp.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return [signup, isSubmitting];
};

export default useSignup;
