import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import IFacebookPage from 'models/facebook/IFacebookPage';
import IFacebookPostResponse from 'models/response/facebook/IFacebookPostResponse';
import { useEffect, useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';
import validationSchema from './validationSchema';
import FacebookIcon from '@mui/icons-material/Facebook';
import ScheduleModal from '../schedule/ScheduleModal';

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
  const [openModal, setOpenModal] = useState(false);
  const [postToBeScheduled, setpostToBeScheduled] = useState<any>({
    text: '',
    pageId: '',
    pageAccessToken: '',
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: (values: any) => {
      console.log('values', values);
      if (clickedBtn === BtnType.SCHEDULE) {
        setpostToBeScheduled((postToBeScheduled) => {
          return {
            ...postToBeScheduled,
            text: values.editedPost,
            pageId: selectedPage.id,
            pageAccessToken: selectedPage.access_token,
          };
        });
        setOpenModal(true);

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
              Post to be published
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
        <Box
          display={'flex'}
          justifyContent={'space-evenly'}
          alignItems={'center'}
          marginTop={7}
          marginBottom={7}
        >
          <LoadingButton
            startIcon={<FacebookIcon />}
            size="large"
            variant="contained"
            color="primary"
            loading={isLoading}
            type="submit"
            name={BtnType.POST}
            onClick={(event) => {
              setClickedBtn(event.currentTarget.name);
            }}
          >
            Post Now
          </LoadingButton>
          <Typography variant="h6" gutterBottom>
            OR
          </Typography>
          <LoadingButton
            startIcon={<FacebookIcon />}
            size="large"
            variant="contained"
            color="primary"
            loading={isScheduleBtnLoading}
            type="submit"
            name={BtnType.SCHEDULE}
            disabled={openModal}
            onClick={(event) => {
              setClickedBtn(event.currentTarget.name);
            }}
          >
            Schedule Post
          </LoadingButton>
          <ScheduleModal
            open={openModal}
            post={postToBeScheduled}
            handleClose={() => setOpenModal(false)}
            handleSchedulePost={handleSchedulePost}
          />
          {response && (
            <Button
              variant="contained"
              color="primary"
              href={facebookService.generatePostUrl(response.id)}
              target="_blank"
              sx={{ marginLeft: '1rem' }}
            >
              View last post
            </Button>
          )}
        </Box>
      </form>
    </>
  );
};
