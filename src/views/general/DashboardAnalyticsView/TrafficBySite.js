import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { fShortenNumber } from 'src/utils/formatNumber';
import googleFill from '@iconify-icons/eva/google-fill';
import twitterFill from '@iconify-icons/eva/twitter-fill';
import facebookFill from '@iconify-icons/eva/facebook-fill';
import linkedinFill from '@iconify-icons/eva/linkedin-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Typography,
  CardHeader,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'FaceBook',
    value: faker.random.number(),
    icon: <Icon icon={facebookFill} color="#1877F2" width={32} height={32} />
  },
  {
    name: 'Google',
    value: faker.random.number(),
    icon: <Icon icon={googleFill} color="#DF3E30" width={32} height={32} />
  },
  {
    name: 'Linkedin',
    value: faker.random.number(),
    icon: <Icon icon={linkedinFill} color="#006097" width={32} height={32} />
  },
  {
    name: 'Twitter',
    value: faker.random.number(),
    icon: <Icon icon={twitterFill} color="#1C9CEA" width={32} height={32} />
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    textAlign: 'center',
    padding: theme.spacing(2.5, 0),
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.divider}`
  },
  listItemIcon: { marginBottom: theme.spacing(0.5) }
}));

// ----------------------------------------------------------------------

function SiteItem({ site }) {
  const classes = useStyles();
  const { icon, value, name } = site;

  return (
    <Grid item xs={6}>
      <div className={classes.listItem}>
        <div className={classes.listItemIcon}>{icon}</div>
        <Typography variant="h6">{fShortenNumber(value)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </div>
    </Grid>
  );
}

TrafficBySite.propTypes = {
  className: PropTypes.string
};

function TrafficBySite({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Traffic by Site" />
      <CardContent>
        <Grid container spacing={2}>
          {SOCIALS.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TrafficBySite;
