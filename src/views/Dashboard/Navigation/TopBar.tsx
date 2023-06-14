import { IconButton, Toolbar, Typography } from '@mui/material';
import { AppBar, Drawer } from '../styles/Dashboard.styles';
import MenuIcon from '@mui/icons-material/Menu';

interface TopBarProps {
  openSideNav: boolean;
  toggleDrawer: () => void;
}

const TopBar = ({ openSideNav, toggleDrawer }: TopBarProps) => {
  return (
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
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
