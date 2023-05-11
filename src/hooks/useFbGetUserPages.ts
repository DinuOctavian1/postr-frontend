import IFacebookPage from 'models/facebook/IFacebookPage';
import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const useFbGetUserPages = (
  externalLoginService: IExternalLoginService,
): [
  getPages: (userId: string, userAccesToken: string) => void,
  pages: IFacebookPage[],
] => {
  const [pages, setPages] = useState<IFacebookPage[]>([]);

  const getPages = (userId: string, accessToken: string) => {
    externalLoginService.getPagesAsync(userId, accessToken).then((res) => {
      if (res?.data) {
        setPages(res.data);
      }
    });
  };

  return [getPages, pages];
};

export default useFbGetUserPages;
