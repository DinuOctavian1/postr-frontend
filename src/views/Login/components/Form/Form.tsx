import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import validationSchema from './validation';
import ILoginRequest from 'models/request/ILoginRequest';
import { useLogin } from 'hooks';
import apiAgent from 'api/ApiAgent';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import ROUTE from 'routes/route';
import { useEffect } from 'react';

const Form = (): JSX.Element => {
  const [login, isLoading, isSuccess] = useLogin(apiAgent, toast);
  const navigate = useNavigate();

  const initialValues: ILoginRequest = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTE.Home);
    }
  }, [isSuccess]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: login,
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
          Login
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Welcome back
        </Typography>
        <Typography color="text.secondary">
          Login to manage your account.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
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
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              marginBottom={2}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Enter your password
                </Typography>
              </Box>
              <Typography variant={'subtitle2'}>
                <Link
                  component={'a'}
                  color={'primary'}
                  href={'/password-reset-simple'}
                  underline={'none'}
                >
                  Forgot your password?
                </Link>
              </Typography>
            </Box>
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
                  Don't have an account yet?{' '}
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/signup-simple'}
                    underline={'none'}
                  >
                    Sign up here.
                  </Link>
                </Typography>
              </Box>
              <LoadingButton
                size={'large'}
                variant={'contained'}
                type={'submit'}
                loading={isLoading}
              >
                Login
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
