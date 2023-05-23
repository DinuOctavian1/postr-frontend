import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import IFacebookPage from 'models/facebook/IFacebookPage';
import { useEffect } from 'react';
import validationSchema from './validationSchema';

interface Props {
  post: string;
  handlePostSubmission: (
    text: string,
    pageId: string,
    pageAccessToken: string,
  ) => void;
  selectedPage: IFacebookPage;
  isLoading: boolean;
}

export const PostForm = ({
  post,
  handlePostSubmission: handlePostSubmission,
  selectedPage,
  isLoading,
}: Props) => {
  const initialValues: {
    selectedPage: IFacebookPage | null;
    editedPost: string;
  } = {
    selectedPage: selectedPage,
    editedPost: post,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      handlePostSubmission(
        values.editedPost,
        selectedPage.id,
        selectedPage.access_token,
      );
    },
  });

  useEffect(() => {
    formik.setFieldValue('editedPost', post);
  }, [post]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4} textAlign={'left'}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom textAlign={'left'}>
              Genearated Post
            </Typography>
            <TextField
              id="editedPost"
              variant="outlined"
              value={formik.values.editedPost}
              onChange={formik.handleChange}
              multiline
              rows={5}
              fullWidth
              error={
                formik.touched.editedPost && Boolean(formik.errors.editedPost)
              }
              // @ts-ignore
              helperText={formik.touched.editedPost && formik.errors.editedPost}
            />
          </Grid>
        </Grid>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading}
          sx={{ marginTop: '3rem' }}
          type="submit"
        >
          Post on Facebook
        </LoadingButton>
      </form>
    </>
  );
};
