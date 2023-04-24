import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PhoneSkeletonIllustration from 'svg/illustrations/PhoneSkeleton';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const About = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Grid container spacing={4} data-aos="fade-left">
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box
          sx={{
            maxWidth: 450,
            position: 'relative',
            marginX: 'auto',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              borderRadius: '2.75rem',
              boxShadow: 1,
              width: '75% !important',
              marginX: 'auto',
            }}
          >
            <Box>
              <Box
                position={'relative'}
                zIndex={2}
                maxWidth={1}
                height={'auto'}
                sx={{ verticalAlign: 'middle' }}
              >
                <PhoneSkeletonIllustration />
              </Box>
              <Box
                position={'absolute'}
                top={'2.4%'}
                left={'4%'}
                width={'92.4%'}
                height={'96%'}
              >
                <Box
                  component={'img'}
                  loading="lazy"
                  src={
                    theme.palette.mode === 'light'
                      ? 'assets/section2.png'
                      : 'assets/section2.png'
                  }
                  alt="Image Description"
                  width={1}
                  height={1}
                  sx={{
                    objectFit: 'unset',
                    borderRadius: '2.5rem',
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item container alignItems={'center'} xs={12} md={6}>
        <Box>
          <Box marginBottom={2}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{
                fontWeight: 700,
              }}
            >
              Discover the Power of Postr
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
              Save time and effort by automating your social media content
              <br />
              Easily post to Facebook, Instagram, and Twitter with just a few
              clicks
            </Typography>
          </Box>
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
      </Grid>
    </Grid>
  );
};

export default About;
