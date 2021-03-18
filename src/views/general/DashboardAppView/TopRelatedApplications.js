import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Scrollbars from 'src/components/Scrollbars';
import appleFilled from '@iconify-icons/ant-design/apple-filled';
import { fCurrency, fShortenNumber } from 'src/utils/formatNumber';
import windowsFilled from '@iconify-icons/ant-design/windows-filled';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Rating,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const APPLICATIONS = [
  {
    name: 'Chrome',
    system: 'Mac',
    price: 0,
    rating: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.random.number(),
    shortcut: '/static/icons/ic_chrome.svg'
  },
  {
    name: 'Drive',
    system: 'Mac',
    price: faker.random.number({ min: 4, max: 99, precision: 0.01 }),
    rating: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.random.number(),
    shortcut: '/static/icons/ic_drive.svg'
  },
  {
    name: 'Dropbox',
    system: 'Windows',
    price: faker.random.number({ min: 4, max: 99, precision: 0.01 }),
    rating: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.random.number(),
    shortcut: '/static/icons/ic_dropbox.svg'
  },
  {
    name: 'Evernote',
    system: 'Mac',
    price: 0,
    rating: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.random.number(),
    shortcut: '/static/icons/ic_evernote.svg'
  },
  {
    name: 'Github',
    system: 'Windows',
    price: 0,
    rating: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.random.number(),
    shortcut: '/static/icons/ic_github.svg'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': {
      marginTop: theme.spacing(3)
    }
  }
}));

// ----------------------------------------------------------------------

function ApplicationItem({ app }) {
  const classes = useStyles();
  const theme = useTheme();
  const { shortcut, system, price, rating, review, name } = app;

  return (
    <div className={classes.listItem}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral'
        }}
      >
        <img src={shortcut} alt={name} width={24} height={24} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160, margin: theme.spacing(0, 2) }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Box
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary'
          }}
        >
          <Icon
            width={16}
            height={16}
            icon={(system === 'Mac' && appleFilled) || windowsFilled}
          />

          <Typography variant="caption" sx={{ ml: 0.5, mr: 1, mt: '-2px' }}>
            {system}
          </Typography>

          <MLabel
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={price === 0 ? 'success' : 'error'}
          >
            {price === 0 ? 'Free' : fCurrency(price)}
          </MLabel>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        <Rating
          readOnly
          size="small"
          precision={0.5}
          name="reviews"
          value={rating}
        />
        <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
          {fShortenNumber(review)}&nbsp;reviews
        </Typography>
      </Box>
    </div>
  );
}

TopRelatedApplications.propTypes = {
  className: PropTypes.string
};

function TopRelatedApplications({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Top Related Applications" />

      <CardContent>
        <Scrollbars>
          {APPLICATIONS.map((app) => (
            <ApplicationItem key={app.name} app={app} />
          ))}
        </Scrollbars>
      </CardContent>
    </Card>
  );
}

export default TopRelatedApplications;
