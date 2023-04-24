import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const TryNow = (): JSX.Element => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Ready to take your social media game to the next level?
        </Typography>
        <Typography variant="h6" color={'text.secondary'} data-aos={'fade-up'}>
          Try it now and discover the power of hassle-free social media
          management
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box>
          <Typography fontWeight={700} variant={'h6'} gutterBottom>
            Try for free
          </Typography>
          <Typography>
            Say goodbye to the stress and time-consuming task of content
            creation and let Postr do the work for you
          </Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
          <Box display="flex" marginTop={1}>
            <Box
              component={Avatar}
              bgcolor={'primary.main'}
              width={{ xs: 40, sm: 50 }}
              height={{ xs: 40, sm: 50 }}
            >
              <TwitterIcon />
            </Box>
            <Box
              component={Avatar}
              bgcolor={'primary.main'}
              marginLeft={1}
              width={{ xs: 40, sm: 50 }}
              height={{ xs: 40, sm: 50 }}
            >
              <InstagramIcon />
            </Box>
            <Box
              component={Avatar}
              bgcolor={'primary.main'}
              marginLeft={1}
              width={{ xs: 40, sm: 50 }}
              height={{ xs: 40, sm: 50 }}
            >
              <FacebookIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TryNow;
