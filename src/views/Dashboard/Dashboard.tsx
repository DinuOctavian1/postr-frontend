import { useEffect, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { mainListItems, secondaryListItems } from './ListItems';
import { AppBar, Drawer } from './styles/Dashboard.styles';
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

function DashboardContent() {
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
    setSelectedPage(page);
  };

  const handlePostNow = (postModel: IFBPostRequest) => {
    postOnFb(postModel);
  };

  const handlePostGeneration = (data: IGeneratePostRequest) => {
    generatePost(data);
  };

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
      <AppBar position="absolute" open={openSideNav}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(openSideNav && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openSideNav}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <ConnectAccount
          login={handleLogin}
          pages={pages}
          showModal={showCreatePostModal}
        />
        <CreatePostModal
          handleUploadFile={handleUploadFile}
          fileUrl={fileUrl}
          isFileLoading={isFileLoading}
          open={openCreatePostModal}
          handleClose={() => setOpenCreatePostModal(false)}
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
}

export default function Dashboard() {
  return <DashboardContent />;
}
