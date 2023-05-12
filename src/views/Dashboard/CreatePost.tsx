import { Main } from 'layouts';
import FacebookService from 'services/FacebookService';
import { Button, Typography } from '@mui/material';
import useFbLogin from 'hooks/useFbLogin';
import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import useGetFBLoginStatus from 'hooks/useGetFBLoginStatus';
import useFbGetUserPages from 'hooks/useFbGetUserPages';
import usePostOnFacebook from 'hooks/usePostOnFacebook';
import useFBLogout from 'hooks/useFBLogout';
import { useEffect, useState } from 'react';
import PagesList from './components/PagesList';
import IFacebookPage from 'models/facebook/IFacebookPage';

export const CreatePost = () => {
  const loggedUser: IFBLoggedUser = useGetFBLoginStatus(
    FacebookService.getInstance(),
  );
  const [getPages, pages] = useFbGetUserPages(FacebookService.getInstance());
  const { login, fbUser: IGetFBUserfromLogin } = useFbLogin(
    FacebookService.getInstance(),
  );
  const { postOnFb, response } = usePostOnFacebook(
    FacebookService.getInstance(),
  );
  const logout = useFBLogout(FacebookService.getInstance());
  const [selectedPage, setSelectedPage] = useState<IFacebookPage>(null);

  useEffect(() => {
    if (loggedUser.isLogged) {
      getPages(loggedUser.userId, loggedUser.token);
    }
  }, []);

  if (!loggedUser.isLogged) {
    return (
      <Button variant="contained" color="primary" onClick={() => login()}>
        Login
      </Button>
    );
  }

  console.log('selectedPage', selectedPage);
  return (
    <Main>
      <Typography variant="h3">Select the Page to post on:</Typography>
      {pages.length > 0 && (
        <PagesList pages={pages} setSelectedPage={setSelectedPage} />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          postOnFb('Hello world 2', pages[0].id, pages[0].access_token);
        }}
      >
        Hello World
      </Button>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => {
          getPages(loggedUser.userId, loggedUser.token);
        }}
      >
        getpage token
      </Button> */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          logout();
        }}
      >
        logout
      </Button>
    </Main>
  );
};
