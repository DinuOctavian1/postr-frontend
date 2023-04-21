import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';

const mock = [
  {
    title: 'Basic',
    price: '22',
    features: [
      {
        title: '1 User',
        isIncluded: true,
      },
      {
        title: '1 App',
        isIncluded: true,
      },
      {
        title: 'Integrations',
        isIncluded: true,
      },
      {
        title: 'Google Ads',
        isIncluded: false,
      },
      {
        title: 'SSO via Google',
        isIncluded: false,
      },
      {
        title: 'API access',
        isIncluded: false,
      },
      {
        title: 'Facebook Ads',
        isIncluded: false,
      },
    ],
    isHighlighted: false,
    btnText: 'Get basic',
  },
  {
    title: 'Professional',
    price: '44',
    features: [
      {
        title: '1 User',
        isIncluded: true,
      },
      {
        title: '1 App',
        isIncluded: true,
      },
      {
        title: 'Integrations',
        isIncluded: true,
      },
      {
        title: 'Google Ads',
        isIncluded: true,
      },
      {
        title: 'SSO via Google',
        isIncluded: true,
      },
      {
        title: 'API access',
        isIncluded: false,
      },
      {
        title: 'Facebook Ads',
        isIncluded: false,
      },
    ],
    isHighlighted: true,
    btnText: 'Get pro',
  },
  {
    title: 'Commercial',
    price: '77',
    features: [
      {
        title: '1 User',
        isIncluded: true,
      },
      {
        title: '1 App',
        isIncluded: true,
      },
      {
        title: 'Integrations',
        isIncluded: true,
      },
      {
        title: 'Google Ads',
        isIncluded: true,
      },
      {
        title: 'SSO via Google',
        isIncluded: true,
      },
      {
        title: 'API access',
        isIncluded: true,
      },
      {
        title: 'Facebook Ads',
        isIncluded: true,
      },
    ],
    isHighlighted: false,
    btnText: 'Contact us',
  },
];

const pricingModels = [
  {
    title: 'Basic',
    price: 10,
    features: [
      {
        title: '10 Posts/Month',
        isIncluded: true,
      },
      {
        title: '1 User Account',
        isIncluded: true,
      },
      {
        title: 'Scheduling Options',
        isIncluded: false,
      },
      {
        title: 'Image Generation',
        isIncluded: false,
      },
      {
        title: 'Facebook, Twitter, Instagram',
        isIncluded: true,
      },
    ],
    isHighlighted: false,
    btnText: 'Get Basic',
  },
  {
    title: 'Professional',
    price: 30,
    features: [
      {
        title: '40 Post/Month',
        isIncluded: true,
      },
      {
        title: '1 User Account',
        isIncluded: true,
      },
      {
        title: 'Scheduling Options',
        isIncluded: true,
      },
      {
        title: 'Image Generation',
        isIncluded: true,
      },
      {
        title: 'Facebook, Twitter, Instagram',
        isIncluded: true,
      },
    ],
    isHighlighted: true,
    btnText: 'Get Pro',
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    features: [
      {
        title: 'Unlimited Posts/Month',
        isIncluded: true,
      },
      {
        title: 'Multiple User Accounts',
        isIncluded: true,
      },
      {
        title: 'Scheduling Options',
        isIncluded: true,
      },
      {
        title: 'Image Generation',
        isIncluded: true,
      },
      {
        title: 'Facebook, Twitter, Instagram',
        isIncluded: true,
      },
    ],
    isHighlighted: false,
    btnText: 'Contact Us',
  },
];

const Pricing = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{ fontWeight: 700 }}
          variant={'h4'}
          align={'center'}
          gutterBottom
        >
          Choose the Right Plan for Your Needs
        </Typography>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'text.secondary'}
          align={'center'}
        >
          Whatever your status, our offers evolve according to your needs.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {pricingModels.map((item, i) => (
          <Grid
            item
            xs={12}
            md={4}
            key={i}
            data-aos={'fade-up'}
            data-aos-delay={i * 100}
            data-aos-offset={100}
            data-aos-duration={600}
          >
            <Box
              component={Card}
              height={1}
              display={'flex'}
              flexDirection={'column'}
              boxShadow={0}
              border={`1px solid ${theme.palette.divider}`}
            >
              <CardContent
                sx={{
                  padding: { sm: 4 },
                }}
              >
                <Box
                  marginBottom={4}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Typography variant={'h6'} gutterBottom>
                    <Box component={'span'} fontWeight={600}>
                      {item.title}
                    </Box>
                  </Typography>
                  <Box display={'flex'} alignItems={'flex-start'}>
                    {typeof item.price === 'number' && (
                      <Typography variant={'h4'} color={'primary'}>
                        <Box
                          component={'span'}
                          fontWeight={600}
                          marginRight={1 / 2}
                        >
                          $
                        </Box>
                      </Typography>
                    )}

                    <Typography variant={'h2'} color={'primary'} gutterBottom>
                      <Box component={'span'} fontWeight={600}>
                        {item.price}
                      </Box>
                    </Typography>
                  </Box>
                  <Typography variant={'subtitle2'} color={'text.secondary'}>
                    Per user, per month
                  </Typography>
                </Box>
                <Grid container spacing={1}>
                  {item.features.map((feature, j) => (
                    <Grid item xs={12} key={j}>
                      <Typography
                        component={'p'}
                        align={'center'}
                        style={{
                          textDecoration: !feature.isIncluded
                            ? 'line-through'
                            : 'none',
                        }}
                      >
                        {feature.title}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
              <Box flexGrow={1} />
              <CardActions sx={{ justifyContent: 'flex-end', padding: 4 }}>
                <Button
                  size={'large'}
                  variant={item.isHighlighted ? 'contained' : 'outlined'}
                >
                  {item.btnText}
                </Button>
              </CardActions>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pricing;
