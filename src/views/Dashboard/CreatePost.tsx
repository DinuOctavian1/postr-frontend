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
  const [editedPost, setEditedPost] = useState<string>('');

  const handlePostGeneration = (newPost: string) => {
    setPost(newPost);
  };

  const handleSetPageChange = (page: IFacebookPage) => {
    setSelectedPage(page);
  };

  const handleEditedPost = (post: string) => {
    setEditedPost(post);
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
                    handleSetPage={handleSetPageChange}
                    handlePostGeneration={handlePostGeneration}
                  />
                </Box>
              )}
            </Grid>
            {/* <Grid item xs={12}>
              <Typography variant="h6" gutterBottom textAlign={'left'}>
                Genearated Post
              </Typography>
              <TextField
                id="generatedPost"
                variant="outlined"
                defaultValue={post}
                onChange={(e: any) => {
                  setEditedPost(e.target.value);
                }}
                multiline
                rows={5}
                fullWidth
              />
            </Grid>
          </Grid> */}
            <Grid item xs={12}>
              <PostForm
                post={post}
                handlePostSubmission={handlePostSubmission}
                selectedPage={selectedPage}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
          {/* <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              const postTobePosted = editedPost ? editedPost : post;
              postOnFb(
                postTobePosted,
                selectedPage?.id,
                selectedPage?.access_token,
              );
              setPost('');
            }}
            //disabled={selectedPage === null || post === ''}
            loading={isLoading}
            sx={{ marginTop: '3rem' }}
          >
            Post on Facebook
          </LoadingButton> */}

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
