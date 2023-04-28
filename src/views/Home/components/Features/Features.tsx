import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Features = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
        >
          What can Postr do for you
        </Typography>

        <Box marginTop={2} display={'flex'} justifyContent={'center'}></Box>
      </Box>
      <Grid
        container
        spacing={isMd ? 0 : 2}
        display="flex"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={12} md={5}>
          <Card data-aos={isMd ? 'fade-right' : 'fade-up'}>
            <CardContent sx={{ padding: { sm: 4 } }}>
              <Grid container spacing={4}>
                {/* <Grid item xs={12}>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Typography
                      variant={'h1'}
                      sx={{ fontWeight: 700 }}
                      color={'primary'}
                    >
                      15%
                    </Typography>
                    <Typography color={'text.secondary'}>
                      per successful transaction
                    </Typography>
                  </Box>
                </Grid> */}
                <Grid item xs={6}>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Box color={theme.palette.primary.main}>
                      {/* <svg
                        width={50}
                        height={50}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                        />
                      </svg> */}
                      <DynamicFeedIcon fontSize={'large'} />
                    </Box>
                    <Typography sx={{ fontWeight: 700 }} align={'center'}>
                      Generate Posts
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Box color={theme.palette.primary.main}>
                      {/* <svg
                        width={50}
                        height={50}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg> */}
                      <ScheduleIcon fontSize={'large'} />
                    </Box>
                    <Typography sx={{ fontWeight: 700 }} align={'center'}>
                      Post Scheduling
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Box color={theme.palette.primary.main}>
                      <BurstModeIcon fontSize={'large'} />
                    </Box>
                    <Typography sx={{ fontWeight: 700 }} align={'center'}>
                      Image Generation
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Box color={theme.palette.primary.main}>
                      <TwitterIcon fontSize={'large'} />
                      <FacebookIcon fontSize={'large'} />
                      <InstagramIcon fontSize={'large'} />
                    </Box>
                    <Typography sx={{ fontWeight: 700 }} align={'center'}>
                      Multiple Platforms
                    </Typography>
                  </Box>
                </Grid>
                {/* <Grid item xs={12}>
                  <Box display={'flex'} justifyContent={'center'}>
                    <Typography
                      variant={'caption'}
                      align={'center'}
                      color={'text.secondary'}
                    >
                      Included for 3 months, <br />
                      then $2.5/monthly included VAT
                    </Typography>
                  </Box>
                </Grid> */}
                <Grid item xs={12}>
                  <Box marginTop={2} display={'flex'} justifyContent={'center'}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={
                        <Box
                          component={'svg'}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          width={24}
                          height={24}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </Box>
                      }
                    >
                      Get started
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item container xs={12} md={5} alignItems={'center'}>
          <Box component={'img'} src={'assets/features.png'} width={1} ml={2} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
