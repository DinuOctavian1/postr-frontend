import { useState } from 'react';
import { useFormik } from 'formik';
import ICreatePost from '../../interfaces/ICreatePost';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import validationSchema from './validationSchema';
import apiAgent from '../../api/agentAPI';
import IPostResponse from '../../interfaces/IPostResponse';
import { toast } from 'react-toastify';
import SOCIAL_MEDIA_PLATFORMS from '../../constants/SocialMediaPlarforms';

const Form = (): JSX.Element => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [post, setPost] = useState<string>('');

    const initialValues: ICreatePost = {
        postDescription: '',
        businessDescription: '',
        socialPlatform: 'FACEBOOK',
    };

    const formik = useFormik({
        //validationSchema: validationSchema,
        initialValues: initialValues,
        onSubmit(values: ICreatePost) {
            apiAgent.Post.generateFacebookPost(values)
                .then((rsp: IPostResponse) => {
                    console.log(rsp);
                    setPost(rsp.message);
                    setIsSubmitted(true);
                })
                .catch((err) => toast.error(err));
        },
    });

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} mb={3}>
                        <TextField
                            label='Business description *'
                            variant='outlined'
                            name={'businessDescription'}
                            fullWidth
                            value={formik.values.businessDescription}
                            onChange={formik.handleChange}
                            error={formik.touched.businessDescription && Boolean(formik.errors.businessDescription)}
                            helperText={formik.touched.businessDescription && formik.errors.businessDescription}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Write some words about the post *'
                            variant='outlined'
                            name={'postDescription'}
                            fullWidth
                            value={formik.values.postDescription}
                            onChange={formik.handleChange}
                            error={formik.touched.postDescription && Boolean(formik.errors.postDescription)}
                            helperText={formik.touched.postDescription && formik.errors.postDescription}
                        />
                    </Grid>
                    <Grid item xs={12} mb={3}>
                        <FormControl>
                            <FormLabel id='demo-controlled-radio-buttons-group'>Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby='demo-controlled-radio-buttons-group'
                                name='socialPlatform'
                                value={formik.values.socialPlatform}
                                onChange={formik.handleChange}
                            >
                                {Object.entries(SOCIAL_MEDIA_PLATFORMS).map(([key, value]) => (
                                    <FormControlLabel value={value} control={<Radio />} label={value} key={key} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {isSubmitted ? (
                        <Typography variant='h4' gutterBottom mt={5}>
                            {post}
                        </Typography>
                    ) : (
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Button size={'large'} variant={'contained'} type={'submit'}>
                                Generate Post
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Box>
    );
};

export default Form;
