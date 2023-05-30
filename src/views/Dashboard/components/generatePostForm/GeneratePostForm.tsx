import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField, Typography } from '@mui/material';
import apiAgent from 'api/ApiAgent';
import { useFormik } from 'formik';
import { useGeneratePost } from 'hooks';
import IFacebookPage from 'models/facebook/IFacebookPage';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import { useEffect } from 'react';
import { PagesList } from './PagesList';
import validationSchema from './validatoinSchema';

interface Props {
  pages: IFacebookPage[];
  handleSetPage: (page: IFacebookPage) => void;
  handlePostGeneration: (post: string) => void;
}

export const GeneratePostForm = ({
  pages,
  handleSetPage,
  handlePostGeneration,
}: Props) => {
  const { post, generatePost, isLoading } = useGeneratePost(apiAgent);

  const initialValues: {
    selectedPage: IFacebookPage | null;
    postDescription: string;
  } = {
    selectedPage: pages.length > 0 ? pages[0] : null,
    postDescription: '',
  };

  useEffect(() => {
    handlePostGeneration(post);
  }, [post]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,

    onSubmit: (values: any) => {
      handleSetPage(values.selectedPage);

      const pagesCategories: string[] = values.selectedPage?.category_list.map(
        (category) => category.name,
      );

      pagesCategories.unshift(values.selectedPage?.category);

      const requestModel: IGeneratePostRequest = {
        postDescription: values.postDescription,
        pageCategories: pagesCategories.join(','),
        pageName: values.selectedPage?.name,
        socialMediaPlatform: 'FACEBOOK',
      };

      generatePost(requestModel);
      handlePostGeneration(post);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          textAlign={'left'}
          display={'flex'}
          alignItems={'center'}
        >
          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select your page
              </Typography>
              <PagesList pages={pages} formik={formik} />
            </Grid>
            <Grid item xs={12} mt={4}>
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
                  value={formik.values.postDescription}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.postDescription &&
                    Boolean(formik.errors.postDescription)
                  }
                  // @ts-ignore
                  helperText={
                    formik.touched.postDescription &&
                    formik.errors.postDescription
                  }
                />
                <LoadingButton
                  size={'large'}
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: '5%' }}
                  type={'submit'}
                  loading={isLoading}
                >
                  Generate
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="assets/generate_post.png" alt="post image" />
          </Grid>
        </Grid>
      </form>
    </>
  );
};
