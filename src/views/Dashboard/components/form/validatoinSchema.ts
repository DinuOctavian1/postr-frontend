import * as yup from 'yup';

const validationSchema = yup.object({
  selectedPage: yup.string().required('Please select a page'),
  postDescription: yup.string().required('Please enter a post description'),
});

export default validationSchema;
