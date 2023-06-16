import IFacebookSchedulePost from 'models/facebook/IFacebookSchedulePosts';
import { useState } from 'react';
import { toast } from 'react-toastify';
import IExternalLoginService from 'services/IExternalLoginService';

const useFbSchdulePost = (
  loginProvider: IExternalLoginService,
): {
  isLoading: boolean;
  resp: any;
  schedulePost: (model: IFacebookSchedulePost) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);

  const schedulePost = (model: IFacebookSchedulePost) => {
    setIsLoading(true);
    loginProvider
      .schedulePostAsync(model)
      .then((response) => {
        setResp(response);
        setIsLoading(false);
        toast.success('Post scheduled successfully');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error scheduling post');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, resp, schedulePost };
};

export default useFbSchdulePost;
