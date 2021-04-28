import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { fPercent, fCurrency } from 'src/utils/formatNumber';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, CardContent } from '@material-ui/core';
import { MLinearProgress } from 'src/theme';

// ----------------------------------------------------------------------

const SALES = [
  {
    label: 'Porgress'
    // amount: faker.finance.amount(),
    // value: faker.random.number({ min: 9, max: 99, precision: 0.1 })
  }
];

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function Progress({ progress, progressValue, progressDollorValue, index }) {
  const classes = useStyles();

  return (
    <div className={classes.progressItem}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>

        <Typography variant="body2" sx={{ my: 2 }}>
          {fCurrency(progressDollorValue)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({fPercent(progressValue)})
        </Typography>
      </Box>
      <MLinearProgress
        variant="determinate"
        value={progressValue}
        color="warning"
        className="porgessbar"
      />
    </div>
  );
}

SalesOverview.propTypes = {
  className: PropTypes.string
};

function SalesOverview({
  className,
  progressValue,
  progressDollorValue,
  ...other
}) {
  const classes = useStyles();

  return (
    <Box sx={{ width: '100%' }}>
      {SALES.map((progress, index) => {
        return (
          <Progress
            key={progress.label}
            progress={progress}
            progressValue={progressValue}
            progressDollorValue={progressDollorValue}
            index={index}
          />
        );
      })}
    </Box>
  );
}

export default SalesOverview;
