import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import apiAgent from 'api/ApiAgent';
import { useFormik } from 'formik';
import { useGeneratePost } from 'hooks';
import IFacebookPage from 'models/facebook/IFacebookPage';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import validationSchema from './validatoinSchema';

interface Props {
  pages: IFacebookPage[];
  handleSetPage: (page: IFacebookPage) => void;
  handlePostChange: (post: string) => void;
}

export const Form = ({ pages, handleSetPage, handlePostChange }: Props) => {
  const { post, generatePost, isLoading } = useGeneratePost(apiAgent);

  const initialValues: {
    selectedPage: IFacebookPage | null;
    postDescription: string;
  } = {
    selectedPage: pages.length > 0 ? pages[0] : null,
    postDescription: '',
  };

  useEffect(() => {
    handlePostChange(post);
  }, [post]);

  const editPost = (post: string) => {
    handlePostChange(post);
  };

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
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Genearated Post
            </Typography>
            <TextField
              id="generatedPost"
              variant="outlined"
              defaultValue={post}
              onChange={(e) => editPost(e.target.value)}
              multiline
              rows={5}
              fullWidth
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};
