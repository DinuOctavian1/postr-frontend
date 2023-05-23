import { LoadingButton } from '@mui/lab';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import IFacebookPage from 'models/facebook/IFacebookPage';
import IFacebookPostResponse from 'models/response/facebook/IFacebookPostResponse';
import { useEffect } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';
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
  response: IFacebookPostResponse;
  facebookService: IExternalLoginService;
}

export const PostForm = ({
  post,
  handlePostSubmission: handlePostSubmission,
  selectedPage,
  isLoading,
  response,
  facebookService,
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
              Generated Post
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

        {response && (
          <Button
            variant="contained"
            color="primary"
            href={facebookService.generatePostUrl(response.id)}
            target="_blank"
            sx={{ marginTop: '3rem', marginLeft: '1rem' }}
          >
            View last post
          </Button>
        )}
      </form>
    </>
  );
};
