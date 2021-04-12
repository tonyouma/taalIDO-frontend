import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Scrollbars from 'src/components/Scrollbars';
import { fShortenNumber } from 'src/utils/formatNumber';
import appleFilled from '@iconify-icons/ant-design/apple-filled';
import windowsFilled from '@iconify-icons/ant-design/windows-filled';
import androidFilled from '@iconify-icons/ant-design/android-filled';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const INSTALLED = [
  {
    name: 'Germany',
    android: faker.random.number(),
    windows: faker.random.number(),
    apple: faker.random.number(),
    flag: '/static/icons/ic_flag_de.svg'
  },
  {
    name: 'England',
    android: faker.random.number(),
    windows: faker.random.number(),
    apple: faker.random.number(),
    flag: '/static/icons/ic_flag_en.svg'
  },
  {
    name: 'France',
    android: faker.random.number(),
    windows: faker.random.number(),
    apple: faker.random.number(),
    flag: '/static/icons/ic_flag_fr.svg'
  },
  {
    name: 'Korean',
    android: faker.random.number(),
    windows: faker.random.number(),
    apple: faker.random.number(),
    flag: '/static/icons/ic_flags_kr.svg'
  },
  {
    name: 'USA',
    android: faker.random.number(),
    windows: faker.random.number(),
    apple: faker.random.number(),
    flag: '/static/icons/ic_flags_us.svg'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': { marginTop: theme.spacing(3) }
  },
  listItemBlock: {
    flex: '1 1',
    minWidth: 72,
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': { marginLeft: theme.spacing(2) },
    '&:first-child': { minWidth: 120 }
  },
  listItemIcon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(0.5),
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

function CountryItem({ country }) {
  const classes = useStyles();

  return (
    <div className={classes.listItem}>
      <div className={classes.listItemBlock}>
        <Box
          component="img"
          alt={country.name}
          src={country.flag}
          sx={{ height: 20, mr: 1 }}
        />
        <Typography variant="subtitle2">{country.name}</Typography>
      </div>
      <div className={classes.listItemBlock}>
        <Icon icon={androidFilled} className={classes.listItemIcon} />
        <Typography variant="body2">
          {fShortenNumber(country.android)}
        </Typography>
      </div>
      <div className={classes.listItemBlock}>
        <Icon icon={windowsFilled} className={classes.listItemIcon} />
        <Typography variant="body2">
          {fShortenNumber(country.windows)}
        </Typography>
      </div>
      <div className={classes.listItemBlock}>
        <Icon icon={appleFilled} className={classes.listItemIcon} />
        <Typography variant="body2">
          {fShortenNumber(country.windows)}
        </Typography>
      </div>
    </div>
  );
}

TopInstalledCountries.propTypes = {
  className: PropTypes.string
};

function TopInstalledCountries({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Top Installed Countries" />
      <CardContent>
        <Scrollbars>
          {INSTALLED.map((country) => (
            <CountryItem key={country.name} country={country} />
          ))}
        </Scrollbars>
      </CardContent>
    </Card>
  );
}

export default TopInstalledCountries;
