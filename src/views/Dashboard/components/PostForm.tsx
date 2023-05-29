import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import IFacebookPage from 'models/facebook/IFacebookPage';
import IFacebookPostResponse from 'models/response/facebook/IFacebookPostResponse';
import { useEffect, useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';
import validationSchema from './validationSchema';
import FacebookIcon from '@mui/icons-material/Facebook';

interface Props {
  post: string;
  handlePostSubmission: (
    text: string,
    pageId: string,
    pageAccessToken: string,
  ) => void;
  selectedPage: IFacebookPage;
  isLoading: boolean;
  isScheduleBtnLoading: boolean;
  response: IFacebookPostResponse;
  facebookService: IExternalLoginService;
  handleSchedulePost: (
    text: string,
    pageId: string,
    pageAccessToken: string,
    timestamp: number,
  ) => void;
}

const BtnType = {
  POST: 'post',
  SCHEDULE: 'schedule',
} as const;

export const PostForm = ({
  post,
  handlePostSubmission: handlePostSubmission,
  handleSchedulePost: handleSchedulePost,
  selectedPage,
  isLoading,
  isScheduleBtnLoading,
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
  const [clickedBtn, setClickedBtn] = useState<string | null>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      if (clickedBtn === BtnType.SCHEDULE) {
        const date = new Date(Date.now() + 10 * 60 * 1000);
        const timestamp = Math.floor(date.getTime() / 1000);
        handleSchedulePost(
          values.editedPost,
          selectedPage.id,
          selectedPage.access_token,
          timestamp,
        );
        return;
      }

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
        <Box display={'flex'} justifyContent={'space-evenly'}>
          <LoadingButton
            startIcon={<FacebookIcon />}
            variant="contained"
            color="primary"
            loading={isLoading}
            sx={{ marginTop: '3rem' }}
            type="submit"
            name={BtnType.POST}
            onClick={(event) => {
              setClickedBtn(event.currentTarget.name);
            }}
          >
            Post
          </LoadingButton>
          <LoadingButton
            startIcon={<FacebookIcon />}
            variant="contained"
            color="primary"
            loading={isScheduleBtnLoading}
            sx={{ marginTop: '3rem' }}
            type="submit"
            name={BtnType.SCHEDULE}
            onClick={(event) => {
              setClickedBtn(event.currentTarget.name);
            }}
          >
            Schedule Post
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
        </Box>
      </form>
    </>
  );
};
