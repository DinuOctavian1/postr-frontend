import { Avatar, Box, Button, Chip, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import IFacebookPage from 'models/facebook/IFacebookPage';

interface Props {
  login: () => void;
  pages: IFacebookPage[];
  showModal: () => void;
}

export const ConnectAccount = ({ login, pages, showModal }: Props) => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box data-aos="fade-up">
              <img
                src="assets/connect.png"
                alt="connect img"
                height={'450px'}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} display="flex" alignItems={'center'}>
            <Box>
              <Box marginBottom={2}>
                <Typography
                  variant="h5"
                  color="text.primary"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {/* Amplify Your Social Media Presence  */}
                  Choose a social network to add an account
                </Typography>
              </Box>
              <Box marginBottom={3}>
                <Typography variant="h6" component="p" color="text.secondary">
                  Add a social network to enhance your online reach and engage
                  with a wider audience.
                  <br />
                  Grow your network, share compelling content, and stay
                  connected with your followers effortlessly
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box display={'flex'} justifyContent="space-evenly" mb={5}>
          <Button variant="contained" color="primary" onClick={() => login()}>
            <FacebookIcon sx={{ marginRight: 1 }} />
            Facebook
          </Button>
          <Button
            disabled
            variant="contained"
            color="primary"
            onClick={() => console.log('click')}
          >
            <InstagramIcon sx={{ marginRight: 1 }} />
            Instagram
          </Button>
          <Button
            disabled
            variant="contained"
            color="primary"
            onClick={() => console.log('click')}
          >
            <TwitterIcon sx={{ marginRight: 1 }} />
            Twitter
          </Button>
        </Box>
        {pages.length > 0 ? (
          <Box>
            <Box display={'flex'} mb={3} alignItems={'center'}>
              <CheckCircleOutlineIcon
                sx={{ marginRight: 1, color: 'green', fontSize: '18px' }}
                // fontSize={'small'}
              />
              <Typography variant="h5">{pages.length}</Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ marginLeft: 1 }}
              >
                social accounts connected
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent="flex-start" mb={5}>
              {pages.map((page: IFacebookPage, index: number) => (
                <Chip
                  key={index}
                  avatar={<Avatar alt={page.name} src={page.iconUrl} />}
                  label={page.name}
                  variant="outlined"
                  size="medium"
                  sx={{ marginRight: 2 }}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            display={'flex'}
            flexDirection={'column'}
            mb={3}
            justifyContent={'center'}
          >
            <Box display={'flex'}>
              <Typography variant="h5">0</Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ marginLeft: 1 }}
              >
                social accounts connected
              </Typography>
            </Box>
            <Typography variant="h6" color="error">
              Connect your social accounts to start creating posts
            </Typography>
          </Box>
        )}
        <Box display={'flex'} justifyContent="flex-end" mb={5}>
          <Button
            variant="contained"
            color="primary"
            size={'large'}
            disabled={pages.length === 0}
            onClick={showModal}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
};
