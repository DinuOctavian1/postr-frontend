import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const useFbSchdulePost = (
  loginProvider: IExternalLoginService,
): {
  isLoading: boolean;
  resp: any;
  schedulePost: (
    message: string,
    pageId: string,
    pageAccessToken: string,
    publishDate: number,
  ) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);

  const schedulePost = (
    message: string,
    pageId: string,
    pageAccessToken: string,
    publishDate: number,
  ) => {
    setIsLoading(true);
    loginProvider
      .schedulePostAsync(message, pageId, pageAccessToken, publishDate)
      .then((response) => {
        setResp(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, resp, schedulePost };
};

export default useFbSchdulePost;
