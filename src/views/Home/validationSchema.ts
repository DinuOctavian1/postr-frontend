import * as yup from 'yup';

const validationSchema = yup.object({
    // businessDescription: yup
    //     .string()
    //     .required('Please provide a short description')
    //     .min(5, 'The description should have at minimum length of 5'),
    postDescription: yup
        .string()
        .required('Please provide a short description')
        .min(5, 'The description should have at minimum length of 5'),
    productDescription: yup
        .string()
        .required('Please provide a short description')
        .min(5, 'The description should have a minimum length of 5'),
    objective: yup
        .string()
        .required('Please provide an objective')
        .min(5, 'The objective should have a minimum length of 5'),
    socialPlatform: yup.mixed().oneOf(['Facebook', 'Instagram', 'Twitter']).required('A selection is required'),
});

export default validationSchema;
