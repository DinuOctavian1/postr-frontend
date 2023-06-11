import IFacebookSchedulePosts from 'models/facebook/IFacebookSchedulePosts';
import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const useFbSchdulePost = (
  loginProvider: IExternalLoginService,
): {
  isLoading: boolean;
  resp: any;
  schedulePost: (model: IFacebookSchedulePosts) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);

  const schedulePost = (model: IFacebookSchedulePosts) => {
    setIsLoading(true);
    loginProvider
      .schedulePostAsync(model)
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
