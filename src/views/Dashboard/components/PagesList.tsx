import IFacebookPage from 'models/facebook/IFacebookPage';
import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

interface IProps {
  pages: IFacebookPage[];
  setSelectedPage: (page: IFacebookPage) => void;
}

export const PagesList = ({ pages, setSelectedPage }: IProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedPage(pages[index]);
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {pages.map((page: IFacebookPage, index: number) => (
        <List component="nav" aria-label="main mailbox folders" key={index}>
          <ListItemButton
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar alt={page.name} src={page.iconUrl} />
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItemButton>
        </List>
      ))}
    </Box>
  );
};

export default PagesList;
