import { Main } from 'layouts';
import FacebookService from 'services/FacebookService';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import useFbLogin from 'hooks/useFbLogin';
import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import useFBGetLoginStatus from 'hooks/usFBGetLoginStatus';
import useFbGetUserPages from 'hooks/useFbGetUserPages';
import usePostOnFacebook from 'hooks/usePostOnFacebook';
import useFBLogout from 'hooks/useFBLogout';
import { useEffect, useState } from 'react';
import IFacebookPage from 'models/facebook/IFacebookPage';

import { Form } from './components/form/Form';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

export const CreatePost = () => {
  const loggedUser: IFBLoggedUser = useFBGetLoginStatus(
    FacebookService.getInstance(),
  );
  const [getPages, pages] = useFbGetUserPages(FacebookService.getInstance());
  const { login, fbUser } = useFbLogin(FacebookService.getInstance());
  const { postOnFb, response, isLoading } = usePostOnFacebook(
    FacebookService.getInstance(),
    toast,
  );
  const handlePostChange = (newPost: string) => {
    setPost(newPost);
  };

  const handleSetPage = (page: IFacebookPage) => {
    setSelectedPage(page);
  };
  const logout = useFBLogout(FacebookService.getInstance());
  const [selectedPage, setSelectedPage] = useState<IFacebookPage>(null);
  const [post, setPost] = useState<string>('');

  useEffect(() => {
    if (loggedUser.isLogged || fbUser?.name) {
      getPages(loggedUser.userId, loggedUser.token);
    }
  }, [fbUser]);

  if (!loggedUser.isLogged) {
    return (
      <Main>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '69vh',
          }}
        >
          <Box>
            <Button variant="contained" color="primary" onClick={() => login()}>
              Connect with Facebook
            </Button>
          </Box>
        </Container>
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
            <Grid item xs={12} mt={3}>
              {pages.length > 0 && (
                <Box>
                  <Form
                    pages={pages}
                    handleSetPage={handleSetPage}
                    handlePostChange={handlePostChange}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom textAlign={'left'}>
                Genearated Post
              </Typography>
              <TextField
                id="generatedPost"
                variant="outlined"
                defaultValue={post}
                onChange={(e) => setPost(e.target.value)}
                multiline
                rows={5}
                fullWidth
              />
            </Grid>
          </Grid>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              postOnFb(post, selectedPage.id, selectedPage.access_token);
              setPost('');
            }}
            disabled={selectedPage === null || post === ''}
            loading={isLoading}
            sx={{ marginTop: '3rem' }}
          >
            Post on Facebook
          </LoadingButton>

          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => {
              logout();
            }}
          >
            logout
          </Button> */}
        </Box>
      </Container>
    </Main>
  );
};
