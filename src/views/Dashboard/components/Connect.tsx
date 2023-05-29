import { Box, Button, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';

interface Props {
  login: () => void;
}

export const Connect = ({ login }: Props) => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box data-aos="fade-up">
              <img src="assets/connect.png" alt="connect img" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} display="flex" alignItems={'center'}>
            <Box>
              <Box marginBottom={2}>
                <Typography
                  variant="h3"
                  color="text.primary"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Amplify Your Social Media Presence
                </Typography>
              </Box>
              <Box marginBottom={3}>
                <Typography variant="h6" component="p" color="text.secondary">
                  Connect with Facebook, Instagram, and Twitter to enhance your
                  online reach and engage with a wider audience.
                  <br />
                  Grow your network, share compelling content, and stay
                  connected with your followers effortlessly
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box display={'flex'} justifyContent="center" mb={15}>
          <Button variant="contained" color="primary" onClick={() => login()}>
            <FacebookIcon sx={{ marginRight: 1 }} />
            Connect with Facebook
          </Button>
        </Box>
      </Container>
    </>
  );
};
