import { Main } from 'layouts';
import FacebookService from 'services/FacebookService';
import { Button, Container, Grid, Typography } from '@mui/material';
import useFbLogin from 'hooks/useFbLogin';
import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import useGetFBLoginStatus from 'hooks/useGetFBLoginStatus';
import useFbGetUserPages from 'hooks/useFbGetUserPages';
import usePostOnFacebook from 'hooks/usePostOnFacebook';
import useFBLogout from 'hooks/useFBLogout';
import { useEffect, useState } from 'react';
import IFacebookPage from 'models/facebook/IFacebookPage';

import { Form } from './components/form/Form';
import { Box } from '@mui/system';

export const CreatePost = () => {
  const loggedUser: IFBLoggedUser = useGetFBLoginStatus(
    FacebookService.getInstance(),
  );
  const [getPages, pages] = useFbGetUserPages(FacebookService.getInstance());
  const { login, fbUser } = useFbLogin(FacebookService.getInstance());
  const { postOnFb, response } = usePostOnFacebook(
    FacebookService.getInstance(),
  );
  const logout = useFBLogout(FacebookService.getInstance());
  const [selectedPage, setSelectedPage] = useState<IFacebookPage>(null);

  useEffect(() => {
    if (loggedUser.isLogged || fbUser?.name) {
      getPages(loggedUser.userId, loggedUser.token);
    }
  }, [fbUser]);

  if (!loggedUser.isLogged) {
    return (
      <Main>
        <Button variant="contained" color="primary" onClick={() => login()}>
          Connect with Facebook
        </Button>
      </Main>
    );
  }

  return (
    <Main>
      <Container>
        <Box textAlign={'center'} paddingY={4}>
          <Typography variant="h3">Create your post</Typography>
          <Grid
            container
            spacing={4}
            display={'flex'}
            justifyContent={'center'}
          >
            <Grid item xs={12}>
              {pages.length > 0 && (
                <Box>
                  <Form pages={pages} />
                </Box>
              )}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              postOnFb('Hello world 2', pages[0].id, pages[0].access_token);
            }}
          >
            Post on Facebook
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
        </Box>
      </Container>
    </Main>
  );
};
