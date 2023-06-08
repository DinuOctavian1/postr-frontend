import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';
import IFacebookPostResponse from 'models/response/facebook/IFacebookPostResponse';
import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const usePostOnFacebook = (
  externalLoginService: IExternalLoginService,
  toastify: any,
): {
  postOnFb: (request: IFBPostRequest) => void;
  response: IFacebookPostResponse;
  isLoading: boolean;
} => {
  const [response, setResponse] = useState<IFacebookPostResponse>(null);
  const [isLoading, setIsLoading] = useState(false);

  const postOnFb = (request: IFBPostRequest) => {
    setIsLoading(true);
    externalLoginService
      .postAsync(request)
      .then((res: IFacebookPostResponse) => {
        setResponse(res);
        if (res?.id) {
          toastify.success(
            'Congratulations: Your post has been published and is now visible to your audience.',
          );
        }
      })
      .catch((rsp: any) => {
        toastify.error(rsp?.data?.error?.message || 'Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { postOnFb, response, isLoading };
};

export default usePostOnFacebook;
