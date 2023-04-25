import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid username')
    .max(50, 'Please enter a valid username')
    .required('Please specify your username'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(5, 'The password should have at minimum length of 5'),
  confirmedPassword: yup
    .string()
    .required('Please confrim your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default validationSchema;
