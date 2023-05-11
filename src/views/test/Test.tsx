import { Main } from 'layouts';
import FacebookIcon from '@mui/icons-material/Facebook';
import FacebookService from 'services/FacebookService';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import useFbLogin from 'hooks/useFbLogin';
import useFacebookSDK from 'config/FacebookSDK';
import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import useGetFBLoginStatus from 'hooks/useGetFBLoginStatus';
import IGetFBUserfromLogin from 'models/response/facebook/IGetFBUserFromLogin';
import useFbGetUserPages from 'hooks/useFbGetUserPages';
import usePostOnFacebook from 'hooks/usePostOnFacebook';

const logout = () => {
  FB.logout(function (response) {
    // Person is now logged out
    console.log(response);
  });
};

export const Test = () => {
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

  return (
    <Main>
      {!loggedUser?.isLogged && (
        <Button variant="contained" color="primary" onClick={() => login()}>
          Login
        </Button>
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          getPages(loggedUser.userId, loggedUser.token);
        }}
      >
        getpage token
      </Button>
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
