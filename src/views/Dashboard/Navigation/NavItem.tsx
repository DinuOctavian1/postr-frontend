import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ActiveComponentType } from './types';

export interface DashboardNavItem {
  title: string;
  icon: JSX.Element;
  componentType: ActiveComponentType;
  handleClick: (component: ActiveComponentType) => void;
}

export const NavItem = ({
  title,
  icon,
  componentType,
  handleClick,
}: DashboardNavItem) => {
  return (
    <ListItemButton
      key={componentType}
      onClick={() => handleClick(componentType)}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};
