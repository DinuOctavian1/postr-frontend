import { Drawer } from '../styles/Dashboard.styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton, List, Toolbar, Divider } from '@mui/material';
import { MainListItems, secondaryListItems } from './ListNavItems';
import { ActiveComponentType } from './types';

interface DashboardDrawerProps {
  openSideNav: boolean;
  toggleDrawer: () => void;
  handleDashboardItemClick: (component: ActiveComponentType) => void;
}

const DashboardDrawer = ({
  openSideNav,
  toggleDrawer,
  handleDashboardItemClick,
}: DashboardDrawerProps) => {
  return (
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
        <MainListItems onClick={handleDashboardItemClick} />
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </Drawer>
  );
};

export default DashboardDrawer;
