import { Main } from 'layouts';
import FacebookService from 'services/FacebookService';
import { Button, Container, Grid, Typography } from '@mui/material';
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
import { toast } from 'react-toastify';
import { PostForm } from './components/PostForm';
import { Connect } from './components/Connect';

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

  const logout = useFBLogout(FacebookService.getInstance());
  const [selectedPage, setSelectedPage] = useState<IFacebookPage>(null);
  const [post, setPost] = useState<string>('');

  const handlePostGeneration = (newPost: string) => {
    setPost(newPost);
  };

  const handleSetPageChange = (page: IFacebookPage) => {
    setSelectedPage(page);
  };

  const handlePostSubmission = (
    post: string,
    pageId: string,
    pageAccessToken: string,
  ) => {
    postOnFb(post, pageId, pageAccessToken);
  };

  useEffect(() => {
    if (loggedUser.isLogged || fbUser?.name) {
      getPages(loggedUser.userId, loggedUser.token);
    }
  }, [fbUser]);

  if (!loggedUser.isLogged) {
    return (
      <Main>
        <Connect login={login} />
      </Main>
    );
  }

  return (
    <Main>
      <Container>
        <Box textAlign={'center'} paddingY={4}>
          <Typography
            variant="h3"
            color="text.primary"
            sx={{
              fontWeight: 700,
            }}
          >
            Create your post
          </Typography>
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
                    handleSetPage={handleSetPageChange}
                    handlePostGeneration={handlePostGeneration}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <PostForm
                post={post}
                handlePostSubmission={handlePostSubmission}
                selectedPage={selectedPage}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>

          {response && (
            <Button
              variant="contained"
              color="primary"
              href={FacebookService.getInstance().generatePostUrl(response.id)}
              target="_blank"
              sx={{ marginTop: '3rem', marginLeft: '1rem' }}
            >
              View last post
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: '3rem' }}
            onClick={() => {
              logout();
            }}
          >
            Disconnect Facebook
          </Button>
        </Box>
      </Container>
    </Main>
  );
};
