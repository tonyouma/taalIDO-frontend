import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { fPercent, fCurrency } from 'src/utils/formatNumber';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
import { MLinearProgress } from 'src/theme';

// ----------------------------------------------------------------------

const SALES = [
  {
    label: 'Total Profit',
    amount: faker.finance.amount(),
    value: faker.random.number({ min: 9, max: 99, precision: 0.1 })
  },
  {
    label: 'Total Income',
    amount: faker.finance.amount(),
    value: faker.random.number({ min: 9, max: 99, precision: 0.1 })
  },
  {
    label: 'Total Expenses',
    amount: faker.finance.amount(),
    value: faker.random.number({ min: 9, max: 99, precision: 0.1 })
  }
];

const COLORS = ['primary', 'info', 'warning'];

const useStyles = makeStyles((theme) => ({
  root: {},
  progressItem: {
    marginTop: theme.spacing(4),
    '&:first-child': { marginTop: theme.spacing(1) }
  }
}));

// ----------------------------------------------------------------------

function Progress({ progress, index }) {
  const classes = useStyles();

  return (
    <div className={classes.progressItem}>
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>

        <Typography variant="body2">{fCurrency(progress.amount)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({fPercent(progress.value)})
        </Typography>
      </Box>
      <MLinearProgress
        variant="determinate"
        value={progress.value}
        color={COLORS[index]}
      />
    </div>
  );
}

SalesOverview.propTypes = {
  className: PropTypes.string
};

function SalesOverview({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Sales Overview" />
      <CardContent>
        {SALES.map((progress, index) => {
          return (
            <Progress key={progress.label} progress={progress} index={index} />
          );
        })}
      </CardContent>
    </Card>
  );
}

export default SalesOverview;
