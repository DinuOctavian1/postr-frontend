import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CreateIcon from '@mui/icons-material/Create';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ROUTE from 'routes/route';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export const mainListItems = (
  <React.Fragment>
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
    <ListItemButton>
      <ListItemIcon>
        <CreateIcon />
      </ListItemIcon>
      <ListItemText primary="Create Post" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Planner" />
    </ListItemButton>
  </React.Fragment>
);

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
