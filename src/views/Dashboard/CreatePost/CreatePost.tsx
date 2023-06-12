import { Main } from 'layouts';
import FacebookService from 'services/FacebookService';
import { Container } from '@mui/material';
import useFbLogin from 'hooks/useFbLogin';
import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import useFBGetLoginStatus from 'hooks/useFBGetLoginStatus';
import useFbGetUserPages from 'hooks/useFbGetUserPages';
import usePostOnFacebook from 'hooks/usePostOnFacebook';
import useFBLogout from 'hooks/useFBLogout';
import { useEffect, useState } from 'react';
import IFacebookPage from 'models/facebook/IFacebookPage';

import { toast } from 'react-toastify';
import { ConnectAccount } from '../ConnectAccounts/ConnectAccount';
import { useFbSchdulePost, useGeneratePost } from 'hooks';
import { CreatePostModal } from './components/createPostModal';
import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';
import apiAgent from 'api/ApiAgent';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import IPost from 'models/interfaces/IPost';
import useUploadFile from 'hooks/useUploadFile';
import IFacebookSchedulePosts from 'models/facebook/IFacebookSchedulePosts';

export const CreatePost = () => {
  // const loggedUser: IFBLoggedUser = useFBGetLoginStatus(
  //   FacebookService.getInstance(),
  // );
  const [getPages, pages] = useFbGetUserPages(FacebookService.getInstance());
  // const { login, fbUser } = useFbLogin(FacebookService.getInstance());
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

  const {
    uploadFile,
    fileUrl,
    isLoading: isFileLoading,
  } = useUploadFile(apiAgent);

  const handleUploadFile = (file: FormData) => {
    uploadFile(file);
  };

  const handleSchedulePost = (model: IFacebookSchedulePosts) => {
    schedulePost(model);
  };

  const handleSetPost = (newPost: IPost) => {
    setPost((prevPost) => ({
      ...prevPost,
      ...newPost,
    }));
  };

  const handleSetPageChange = (page: IFacebookPage) => {
    setSelectedPage(page);
  };

  const handlePostNow = (postModel: IFBPostRequest) => {
    postOnFb(postModel);
  };

  const hanlePostGeneration = (data: IGeneratePostRequest) => {
    generatePost(data);
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  // const showCreatePostModal = () => {
  //   setOpen(true);
  // };

  // useEffect(() => {
  //   if (loggedUser.isLogged || fbUser?.name) {
  //     getPages(loggedUser.userId, loggedUser.token);
  //     //logout();
  //   }
  // }, [fbUser]);

  return (
    <Main>
      <Container>
        {/* <ConnectAccount
          login={login}
          pages={pages ?? null}
          showModal={showCreatePostModal}
        /> */}

        <CreatePostModal
          handleUploadFile={handleUploadFile}
          fileUrl={fileUrl}
          isFileLoading={isFileLoading}
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
          handleSchedulePost={handleSchedulePost}
          handleSetPost={handleSetPost}
          handleGeneratePost={hanlePostGeneration}
        />
      </Container>
    </Main>
  );
};
