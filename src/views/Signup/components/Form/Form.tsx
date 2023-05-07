import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import validationSchema from './validationSchema';
import apiAgent from 'api/ApiAgent';
import { LoadingButton } from '@mui/lab';
import { useSignup } from 'hooks';
import { toast } from 'react-toastify';

const Form = (): JSX.Element => {
  const [signup, isLoading] = useSignup(apiAgent, toast);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmedPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: signup,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Signup
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Create an account
        </Typography>
        <Typography color="text.secondary">
          Fill out the form to get started.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your Username
            </Typography>
            <TextField
              label="Username *"
              variant="outlined"
              name={'username'}
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              // @ts-ignore
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your email
            </Typography>
            <TextField
              label="Email *"
              variant="outlined"
              name={'email'}
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              // @ts-ignore
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your password
            </Typography>
            <TextField
              label="Password *"
              variant="outlined"
              name={'password'}
              type={'password'}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              // @ts-ignore
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Confirm your password
            </Typography>
            <TextField
              label="Confirm Password *"
              variant="outlined"
              name={'confirmedPassword'}
              type={'password'}
              fullWidth
              value={formik.values.confirmedPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmedPassword &&
                Boolean(formik.errors.confirmedPassword)
              }
              // @ts-ignore
              helperText={
                formik.touched.confirmedPassword &&
                formik.errors.confirmedPassword
              }
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Already have an account?{' '}
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/signin-simple'}
                    underline={'none'}
                  >
                    Login.
                  </Link>
                </Typography>
              </Box>
              <LoadingButton
                variant={'contained'}
                type={'submit'}
                loading={isLoading}
              >
                Sign up
              </LoadingButton>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={12}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              variant={'subtitle2'}
              color={'text.secondary'}
              align={'center'}
            >
              By clicking "Sign up" button you agree with our{' '}
              <Link
                component={'a'}
                color={'primary'}
                href={'/company-terms'}
                underline={'none'}
              >
                company terms and conditions.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
