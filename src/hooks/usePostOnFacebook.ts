import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const usePostOnFacebook = (
  externalLoginService: IExternalLoginService,
  toastify: any,
): {
  postOnFb: (text: string, pageId: string, pageAccessToken: string) => void;
  response: any;
  isLoading: boolean;
} => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const postOnFb = (text: string, pageId: string, pageAccessToken: string) => {
    setIsLoading(true);
    externalLoginService
      .postAsync(text, pageId, pageAccessToken)
      .then((res) => {
        setResponse(res);
        if (res?.id) {
          toastify.success(
            'Congratulations: Your post has been published and is now visible to your audience.',
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { postOnFb, response, isLoading };
};

export default usePostOnFacebook;
