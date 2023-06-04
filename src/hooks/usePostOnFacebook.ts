import IFBPostRRequest from 'models/request/facebook/IFBPostRRequest';
import IFacebookPostResponse from 'models/response/facebook/IFacebookPostResponse';
import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const usePostOnFacebook = (
  externalLoginService: IExternalLoginService,
  toastify: any,
): {
  postOnFb: (request: IFBPostRRequest) => void;
  response: IFacebookPostResponse;
  isLoading: boolean;
} => {
  const [response, setResponse] = useState<IFacebookPostResponse>(null);
  const [isLoading, setIsLoading] = useState(false);

  const postOnFb = (request: IFBPostRRequest) => {
    setIsLoading(true);
    externalLoginService
      .postAsync(request.text, request.pageId, request.pageAccessToken)
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
