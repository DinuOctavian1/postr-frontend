import { Avatar, Box, MenuItem, Select, Typography } from '@mui/material';
import IFacebookPage from 'models/facebook/IFacebookPage';

interface IProps {
  pages: IFacebookPage[];
  formik: any;
}

export const PagesList = ({ pages, formik }: IProps) => {
  const handle = (event: any, id: string) => {
    const selectedPageId = id;
    console.log('selectedPageId', selectedPageId);
    const page = pages.find((page) => page.id === event.target.value);
    console.log('page', page);
    formik.setFieldValue(id, page);
  };

  return (
    <Select
      labelId="page-label"
      id="selectedPage"
      defaultValue={
        formik.initialValues.selectedPage
          ? formik.initialValues.selectedPage.id
          : ''
      }
      //value={formik.values.selectedPage}
      onChange={(event) => handle(event, 'selectedPage')}
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
