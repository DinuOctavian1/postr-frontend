import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import IFacebookPage from 'models/facebook/IFacebookPage';
import { PagesList } from './PagesList';
import validationSchema from './validatoinSchema';

interface Props {
  pages: IFacebookPage[];
}

export const Form = ({ pages }: Props) => {
  const initialValues: {
    selectedPage: IFacebookPage | null;
    postDescription: string;
  } = {
    selectedPage: pages.length > 0 ? pages[0] : null,
    postDescription: '',
  };

  const formik = useFormik({
    initialValues,
    //validationSchema: validationSchema,

    onSubmit: (values: any) => {
      console.log('values', values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4} textAlign={'left'}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Select your page
            </Typography>
            <PagesList pages={pages} formik={formik} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Describe your post
            </Typography>
            <Box display={'inline-flex'} width={1} alignItems={'center'}>
              <TextField
                id="postDescription"
                label="Post description"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
              />
              <Button
                size={'large'}
                variant="contained"
                color="primary"
                sx={{ marginLeft: '5%' }}
              >
                Generate
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Genearated Post
            </Typography>
            <TextField
              id="generatedPost"
              label="Generated post"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button size={'large'} variant={'contained'} type={'submit'}>
          submit
        </Button>
      </form>
    </>
  );
};
