/* eslint-disable indent */
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { FacebookService } from 'services';
import { ConnectAccount } from './ConnectAccounts/ConnectAccount';
import apiAgent from 'api/ApiAgent';
import { toast } from 'react-toastify';
import useFacebookAPI from 'hooks/facebook/useFacebookAPI';
import useUploadFile from 'hooks/useUploadFile';
import { CreatePostModal } from './CreatePost/components/createPostModal';
import IFacebookSchedulePost from 'models/facebook/IFacebookSchedulePosts';
import IPost from 'models/interfaces/IPost';
import IFacebookPage from 'models/facebook/IFacebookPage';
import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import { ActiveComponent, ActiveComponentType } from './Navigation/types';
import TopBar from './Navigation/TopBar';
import DashboardDrawer from './Navigation/DashboardDrawer';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponentType>(
    ActiveComponent.CONNECT_ACCOUNTS,
  );

  const [openSideNav, setOpenSideNav] = useState(true);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const {
    uploadFile,
    fileUrl,
    isLoading: isFileLoading,
  } = useUploadFile(apiAgent);

  const {
    pages,
    selectedPage,
    post,
    isLoadingPost,
    isScheduleBtnLoading,
    isGeneratedPostLoading,
    generatedPost,
    fbUser,
    loggedUser,
    getPages,
    login,
    logout,
    setSelectedPage,
    setPost,
    postOnFb,
    schedulePost,
    generatePost,
  } = useFacebookAPI(apiAgent, FacebookService.getInstance(), toast);

  const toggleDrawer = () => {
    setOpenSideNav(!openSideNav);
  };

  const handleDashboardItemClick = (component: ActiveComponentType) => {
    setActiveComponent(component);
  };

  const showCreatePostModal = () => {
    setOpenCreatePostModal(true);
  };

  const handleUploadFile = (file: FormData) => {
    uploadFile(file);
  };

  const handleLogin = () => {
    login();
  };

  const handleGetPages = (userId: string, accessToken: string) => {
    getPages(userId, accessToken);
  };

  const handleLogout = () => {
    logout();
  };

  const handleSchedulePost = (model: IFacebookSchedulePost) => {
    schedulePost(model);
  };

  const handleSetPost = (newPost: IPost) => {
    setPost((prevPost) => ({
      ...prevPost,
      ...newPost,
    }));
  };

  const handleSetPageChange = (page: IFacebookPage) => {
    setSelectedPage((prevPage) => ({
      ...prevPage,
      ...page,
    }));
  };

  const handlePostNow = (postModel: IFBPostRequest) => {
    postOnFb(postModel);
  };

  const handlePostGeneration = (data: IGeneratePostRequest) => {
    generatePost(data);
  };

  const handleCreatePostModalClose = () => {
    setOpenCreatePostModal(false);
    setActiveComponent(ActiveComponent.CONNECT_ACCOUNTS);
  };

  useEffect(() => {
    if (ActiveComponent.CREATE_POST === activeComponent) {
      showCreatePostModal();
    }
  }, [activeComponent]);

  useEffect(() => {
    if (loggedUser.isLogged || fbUser?.name) {
      handleGetPages(loggedUser.userId, loggedUser.token);
    }
  }, [fbUser]);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <CssBaseline />
      <TopBar openSideNav={openSideNav} toggleDrawer={toggleDrawer} />
      <DashboardDrawer
        openSideNav={openSideNav}
        toggleDrawer={toggleDrawer}
        handleDashboardItemClick={handleDashboardItemClick}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {activeComponent &&
          activeComponent === ActiveComponent.CONNECT_ACCOUNTS && (
            <ConnectAccount
              key={ActiveComponent.CONNECT_ACCOUNTS}
              login={handleLogin}
              pages={pages}
              showModal={showCreatePostModal}
            />
          )}
        <CreatePostModal
          handleUploadFile={handleUploadFile}
          fileUrl={fileUrl}
          isFileLoading={isFileLoading}
          open={openCreatePostModal}
          handleClose={handleCreatePostModalClose}
          pages={pages}
          handleSetPage={handleSetPageChange}
          post={post}
          generatedPost={generatedPost}
          isGeneratedPostLoading={isGeneratedPostLoading}
          handlePostNow={handlePostNow}
          selectedPage={selectedPage}
          isPostBtnLoading={isLoadingPost}
          isScheduleBtnLoading={isScheduleBtnLoading}
          handleSchedulePost={handleSchedulePost}
          handleSetPost={handleSetPost}
          handleGeneratePost={handlePostGeneration}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
