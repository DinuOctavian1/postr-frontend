import { Main } from 'layouts';
import FacebookService from 'services/FacebookService';
import { Container } from '@mui/material';
import useFbLogin from 'hooks/useFbLogin';
import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import useFBGetLoginStatus from 'hooks/usFBGetLoginStatus';
import useFbGetUserPages from 'hooks/useFbGetUserPages';
import usePostOnFacebook from 'hooks/usePostOnFacebook';
import useFBLogout from 'hooks/useFBLogout';
import { useEffect, useState } from 'react';
import IFacebookPage from 'models/facebook/IFacebookPage';

import { toast } from 'react-toastify';
import { ConnectAccount } from './components/ConnectAccounts/ConnectAccount';
import { useFbSchdulePost, useGeneratePost } from 'hooks';
import { CreatePostModal } from './components/createPostModal';
import IFBPostRRequest from 'models/request/facebook/IFBPostRRequest';
import apiAgent from 'api/ApiAgent';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';

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
  const {
    isLoading: isScheduleBtnLoading,
    resp,
    schedulePost,
  } = useFbSchdulePost(FacebookService.getInstance());

  const {
    post: generatedPost,
    generatePost,
    isLoading: isGeneratedPostLoading,
  } = useGeneratePost(apiAgent);

  const handleSetPost = (newPost: string) => {
    setPost(newPost);
  };

  const handleSetPageChange = (page: IFacebookPage) => {
    setSelectedPage(page);
  };

  const handlePostNow = (
    post: string,
    pageId: string,
    pageAccessToken: string,
  ) => {
    const model: IFBPostRRequest = {
      text: post,
      pageId: pageId,
      pageAccessToken: pageAccessToken,
    };

    postOnFb(model);
  };

  const hanlePostGeneration = (data: IGeneratePostRequest) => {
    generatePost(data);
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (loggedUser.isLogged || fbUser?.name) {
      getPages(loggedUser.userId, loggedUser.token);
      setOpen(true);
    }
  }, [fbUser]);

  if (!loggedUser.isLogged) {
    return (
      <Main>
        <ConnectAccount login={login} />
      </Main>
    );
  }

  return (
    <Main>
      <Container>
        <CreatePostModal
          open={open}
          handleClose={handleClose}
          pages={pages}
          handleSetPage={handleSetPageChange}
          post={post}
          generatedPost={generatedPost}
          isGeneratedPostLoading={isGeneratedPostLoading}
          handlePostNow={handlePostNow}
          selectedPage={selectedPage}
          isLoading={isLoading}
          isScheduleBtnLoading={isScheduleBtnLoading}
          handleSchedulePost={schedulePost}
          handleSetPost={handleSetPost}
          handleGeneratePost={hanlePostGeneration}
        />
      </Container>
    </Main>
  );
};
