import * as yup from 'yup';

const validationSchema = yup.object({
  editedPost: yup.string().required('Please enter a post description'),
});

export default validationSchema;
