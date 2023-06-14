import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ROUTE from 'routes/route';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import CreateIcon from '@mui/icons-material/Create';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DashboardNavItem, NavItem } from './NavItem';
import { ActiveComponent, ActiveComponentType } from './types';

interface Props {
  onClick: (componet: ActiveComponentType) => void;
}

export const MainListItems = ({ onClick }: Props): JSX.Element => {
  const DashboardNavItems: DashboardNavItem[] = [
    {
      title: 'Create Post',
      icon: <CreateIcon />,
      componentType: ActiveComponent.CREATE_POST,
      handleClick: onClick,
    },

    {
      title: 'Planner',
      icon: <CalendarMonthIcon />,
      componentType: ActiveComponent.PLANNER,
      handleClick: onClick,
    },
    {
      title: 'Accounts',
      icon: <AccountTreeIcon />,
      componentType: ActiveComponent.CONNECT_ACCOUNTS,
      handleClick: onClick,
    },
  ];

  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <Button
            component={Link}
            to={ROUTE.Home}
            sx={{ width: 40, height: 40, marginLeft: -2 }}
          >
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ width: 40, height: 40 }}
            />
          </Button>
        </ListItemIcon>
        <ListItemText primary="Postr" />
      </ListItemButton>
      {DashboardNavItems.map((item, index) => (
        <NavItem
          key={index}
          title={item.title}
          componentType={item.componentType}
          icon={item.icon}
          handleClick={item.handleClick}
        />
      ))}
    </>
  );
};

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <AccountTreeIcon />
      </ListItemIcon>
      <ListItemText primary="Accounts" />
    </ListItemButton>
  </React.Fragment>
);
