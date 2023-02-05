import * as yup from 'yup';
import SOCIAL_MEDIA_PLATFORMS from '../../constants/SocialMediaPlarforms';

const validationSchema = yup.object({
    businessDescription: yup
        .string()
        .required('Please provide a short description')
        .min(5, 'The description should have at minimum length of 5'),
    postDescription: yup
        .string()
        .required('Please provide a short description')
        .min(5, 'The description should have at minimum length of 5'),
    socialPlatform: yup.mixed().oneOf(['Option 1', 'Option 2', 'Option 3', '']).required('A selection is required'),
});

export default validationSchema;
