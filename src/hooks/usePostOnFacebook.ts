import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const usePostOnFacebook = (
  externalLoginService: IExternalLoginService,
): {
  postOnFb: (text: string, pageId: string, pageAccessToken: string) => void;
  response: any;
} => {
  const [response, setResponse] = useState();

  const postOnFb = (text: string, pageId: string, pageAccessToken: string) => {
    externalLoginService
      .postAsync(text, pageId, pageAccessToken)
      .then((res) => {
        console.log(res);
        setResponse(res);
      });
  };

  return { postOnFb, response };
};

export default usePostOnFacebook;
