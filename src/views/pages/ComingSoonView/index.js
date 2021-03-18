import React from 'react';
import Countdown from './Countdown';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Icon } from '@iconify/react';
import useCountdown from 'src/hooks/useCountdown';
import { Link as RouterLink } from 'react-router-dom';
import twitterFill from '@iconify-icons/eva/twitter-fill';
import facebookFill from '@iconify-icons/eva/facebook-fill';
import linkedinFill from '@iconify-icons/eva/linkedin-fill';
import instagramFilled from '@iconify-icons/ant-design/instagram-filled';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Tooltip,
  Container,
  Typography,
  InputAdornment,
  OutlinedInput
} from '@material-ui/core';
import { MIconButton } from 'src/theme';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={24} height={24} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={24} height={24} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={24} height={24} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={24} height={24} color="#1C9CEA" />
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
  },
  header: {
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 0)
    }
  },
  input: {
    paddingRight: 4,
    transition: theme.transitions.create('box-shadow', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    margin: theme.spacing(5, 0),
    '&.Mui-focused': { boxShadow: theme.shadows[25].z8 },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

function ComingSoonView() {
  const classes = useStyles();
  const countdown = useCountdown(new Date('07/07/2022 21:30'));

  return (
    <Page title="Coming Soon | Minimal-UI" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>

      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Coming Soon!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We are currently working hard on this page!
          </Typography>

          <Box
            component="img"
            alt="comingsoon"
            src="/static/illustrations/illustration_coming_soon.svg"
            sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
          />

          <Countdown countdown={countdown} />

          <OutlinedInput
            fullWidth
            placeholder="Enter your email"
            endAdornment={
              <InputAdornment position="end" edge="end">
                <Button variant="contained" size="large" to="/">
                  Notify Me
                </Button>
              </InputAdornment>
            }
            className={classes.input}
          />

          <Box sx={{ textAlign: 'center', '& > *': { mx: 1 } }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

export default ComingSoonView;
