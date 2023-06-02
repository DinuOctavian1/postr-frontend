import { Avatar, Box, MenuItem, Select, Typography } from '@mui/material';
import IFacebookPage from 'models/facebook/IFacebookPage';
import { useEffect } from 'react';

interface IProps {
  pages: IFacebookPage[];
  handleSetPageChange: (page: IFacebookPage) => void;
}

export const PagesList = ({ pages, handleSetPageChange }: IProps) => {
  useEffect(() => {
    handleSetPageChange(pages[0]);
  }, []);

  const handle = (event: any) => {
    const page = pages.find((page) => page.id === event.target.value);
    handleSetPageChange(page);
  };

  return (
    <Select
      labelId="page-label"
      id="selectedPage"
      defaultValue={pages[0].id}
      onChange={(event) => handle(event)}
      name="selectedPage"
      fullWidth
    >
      {pages.map((page: IFacebookPage, index: number) => (
        <MenuItem key={index} value={page.id}>
          <Box display="flex" alignItems="center">
            <Avatar alt={page.name} src={page.iconUrl} />
            <Typography variant="body1" ml={2}>
              {page.name}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};
