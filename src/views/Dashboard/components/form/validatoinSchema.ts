import * as yup from 'yup';

const validationSchema = yup.object({
  selectedPage: yup.string().required('Please select a page'),
});

export default validationSchema;
