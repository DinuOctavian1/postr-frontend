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
import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';
import apiAgent from 'api/ApiAgent';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import IPost from 'models/interfaces/IPost';

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
  const [post, setPost] = useState<IPost>({
    text: '',
    imageUrl: '',
  });
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

  const handleSetPost = (newPost: IPost) => {
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
    const model: IFBPostRequest = {
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

  const showCreatePostModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (loggedUser.isLogged || fbUser?.name) {
      getPages(loggedUser.userId, loggedUser.token);
      //logout();
    }
  }, [fbUser]);

  return (
    <Main>
      <Container>
        <ConnectAccount
          login={login}
          pages={pages ?? null}
          showModal={showCreatePostModal}
        />

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
