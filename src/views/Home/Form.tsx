import { useState } from 'react';
import { useFormik } from 'formik';
import IGeneratePostRequest from '../../models/request/ICreatePostRequest';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import validationSchema from './validationSchema';
import apiAgent from '../../api/ApiAgent';
import IGeneratePostResponse from '../../models/response/IGeneratePostResponse';
import { toast } from 'react-toastify';
import SOCIAL_MEDIA_PLATFORMS from '../../constants/SocialMediaPlarforms';

const Form = (): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [post, setPost] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return <></>;
  // const initialValues: ICreatePostRequest = {
  //   postDescription: '',
  //   businessDescription: '',
  //   socialPlatform: 'FACEBOOK',
  //   productDescription: '',
  //   objective: '',
  // };

  // const formik = useFormik({
  //   validationSchema: validationSchema,
  //   initialValues: initialValues,
  //   onSubmit: (values: ICreatePostRequest) => {
  //     setIsLoading(true);
  //     apiAgent.Post.generateFacebookPost(values)
  //       .then((rsp: IPostResponse) => {
  //         setPost(rsp.message);
  //         setIsSubmitted(true);
  //       })
  //       .catch((err) => toast.error(err))
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   },
  // });

  // return (
  //   <Box>
  //     <form onSubmit={formik.handleSubmit}>
  //       <Grid container spacing={2}>
  //         {/* <Grid item xs={12} mb={3}>
  //                       <TextField
  //                           label='Business description *'
  //                           variant='outlined'
  //                           name={'businessDescription'}
  //                           fullWidth
  //                           value={formik.values.businessDescription}
  //                           onChange={formik.handleChange}
  //                           error={formik.touched.businessDescription && Boolean(formik.errors.businessDescription)}
  //                           helperText={formik.touched.businessDescription && formik.errors.businessDescription}
  //                       />
  //                   </Grid> */}
  //         <Grid item xs={12} mb={3}>
  //           <TextField
  //             label="Product *"
  //             variant="outlined"
  //             name={'productDescription'}
  //             fullWidth
  //             value={formik.values.productDescription}
  //             onChange={formik.handleChange}
  //             error={
  //               formik.touched.productDescription &&
  //               Boolean(formik.errors.productDescription)
  //             }
  //             helperText={
  //               formik.touched.productDescription &&
  //               formik.errors.productDescription
  //             }
  //           />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <TextField
  //             label="Write some words about the post *"
  //             variant="outlined"
  //             name={'postDescription'}
  //             fullWidth
  //             value={formik.values.postDescription}
  //             onChange={formik.handleChange}
  //             error={
  //               formik.touched.postDescription &&
  //               Boolean(formik.errors.postDescription)
  //             }
  //             helperText={
  //               formik.touched.postDescription && formik.errors.postDescription
  //             }
  //           />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <TextField
  //             label="The objective of the post:  *"
  //             variant="outlined"
  //             name={'objective'}
  //             fullWidth
  //             value={formik.values.objective}
  //             onChange={formik.handleChange}
  //             error={
  //               formik.touched.objective && Boolean(formik.errors.objective)
  //             }
  //             helperText={formik.touched.objective && formik.errors.objective}
  //           />
  //         </Grid>
  //         <Grid item xs={12} mb={3}>
  //           <FormControl>
  //             <FormLabel id="demo-controlled-radio-buttons-group">
  //               Social Media Platform
  //             </FormLabel>
  //             <RadioGroup
  //               aria-labelledby="demo-controlled-radio-buttons-group"
  //               name="socialPlatform"
  //               value={formik.values.socialPlatform}
  //               onChange={formik.handleChange}
  //             >
  //               {Object.entries(SOCIAL_MEDIA_PLATFORMS).map(([key, value]) => (
  //                 <FormControlLabel
  //                   value={value}
  //                   control={<Radio />}
  //                   label={value}
  //                   key={key}
  //                 />
  //               ))}
  //             </RadioGroup>
  //             {formik.errors.socialPlatform && formik.touched.socialPlatform ? (
  //               <FormHelperText error>
  //                 {formik.touched.socialPlatform &&
  //                   formik.errors.socialPlatform}
  //               </FormHelperText>
  //             ) : null}
  //           </FormControl>
  //         </Grid>
  //         {isSubmitted ? (
  //           <>
  //             <Typography variant="h4" gutterBottom mt={5}>
  //               {post}
  //             </Typography>
  //             <Button
  //               size="large"
  //               variant="contained"
  //               onClick={() => {
  //                 formik.resetForm();
  //                 setPost('');
  //                 setIsSubmitted(false);
  //               }}
  //             >
  //               Clear
  //             </Button>
  //           </>
  //         ) : (
  //           <Grid item xs={12} display="flex" justifyContent="center">
  //             {isLoading ? (
  //               <LoadingButton loading={true} variant="outlined">
  //                 Fetch api
  //               </LoadingButton>
  //             ) : (
  //               <Button size={'large'} variant={'contained'} type={'submit'}>
  //                 Generate Post
  //               </Button>
  //             )}
  //           </Grid>
  //         )}
  //       </Grid>
  //     </form>
  //   </Box>
  // );
};

export default Form;
