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
import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import { useFbLogin, useFbGetUserPages, useFBGetLoginStatus } from 'hooks';
import { ConnectAccount } from './ConnectAccounts/ConnectAccount';

function DashboardContent() {
  const [openSideNav, setOpenSideNav] = useState(true);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const loggedUser: IFBLoggedUser = useFBGetLoginStatus(
    FacebookService.getInstance(),
  );
  const [getPages, pages] = useFbGetUserPages(FacebookService.getInstance());
  const { login, fbUser } = useFbLogin(FacebookService.getInstance());

  const toggleDrawer = () => {
    setOpenSideNav(!openSideNav);
  };

  const showCreatePostModal = () => {
    setOpenCreatePostModal(true);
  };

  useEffect(() => {
    if (loggedUser.isLogged || fbUser?.name) {
      getPages(loggedUser.userId, loggedUser.token);
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
          login={login}
          pages={pages ?? null}
          showModal={showCreatePostModal}
        />
        {/* <CreatePostModal
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
        /> */}
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
