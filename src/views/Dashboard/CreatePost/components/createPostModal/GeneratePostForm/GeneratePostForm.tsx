import { Box, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import IFacebookPage from 'models/facebook/IFacebookPage';
import { useEffect } from 'react';
import validationSchema from './validationSchema';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import GeneratePostBtn from '../../Buttons/GeneratePostBtn';

interface Props {
  post: string;
  generatedPost: string;
  selectedPage: IFacebookPage;
  isGeneratedPostLoading: boolean;
  handleGeneratePost: (data: IGeneratePostRequest) => void;
  handleSetPost: (newPost: string) => void;
}

export const PostForm = ({
  post,
  generatedPost,
  selectedPage,
  isGeneratedPostLoading,
  handleGeneratePost,
  handleSetPost,
}: Props) => {
  const initialValues: {
    selectedPage: IFacebookPage | null;
    post: string;
  } = {
    selectedPage: selectedPage,
    post: post,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: (values: any) => {
      const pagesCategories: string[] =
        initialValues.selectedPage?.category_list.map(
          (category) => category.name,
        );
      const generatePostRequest: IGeneratePostRequest = {
        postDescription: values.post,
        pageCategories: pagesCategories.join(','),
        pageName: initialValues.selectedPage?.name,
        socialMediaPlatform: 'FACEBOOK',
      };

      handleGeneratePost(generatePostRequest);
    },
  });

  const handlePostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('post', event.target.value);
    handleSetPost(event.target.value);
  };

  useEffect(() => {
    formik.setFieldValue('post', generatedPost);
    handleSetPost(generatedPost);
  }, [generatedPost]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4} textAlign={'left'}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom textAlign={'left'}>
              Post to be published
            </Typography>
            <TextField
              id="post"
              variant="outlined"
              value={formik.values.post}
              onChange={handlePostChange}
              multiline
              rows={10}
              fullWidth
              label={'Enter your post here'}
              error={formik.touched.post && Boolean(formik.errors.post)}
              // @ts-ignore
              helperText={formik.touched.post && formik.errors.post}
            />
          </Grid>
        </Grid>
        <Box mt={5}>
          <GeneratePostBtn isLoading={isGeneratedPostLoading} />
        </Box>

        {/* <Box mt={5}>
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
        </Box> */}
      </form>
    </>
  );
};
