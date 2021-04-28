import clsx from 'clsx';
import React, { useEffect } from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { fPercent, fCurrencyKRW, fCurrency } from 'src/utils/formatNumber';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, CardContent } from '@material-ui/core';
import { MLinearProgress } from 'src/theme';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const SALES = [
  {
    label: 'Progress'
    // amount: faker.finance.amount(),
    // value: faker.random.number({ min: 9, max: 99, precision: 0.1 })
  }
];

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function Progress({ progressValue, progressDollorValue }) {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
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
          {/*{progress.label}*/}
          {t('taalswap.Progress')}
        </Typography>

        <Typography variant="body2" sx={{ my: 2 }}>
          {langStorage === 'kr'
            ? `₩${fCurrencyKRW(progressDollorValue)}`
            : fCurrency(progressDollorValue)}
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

function SalesOverview({ className, progressValue, progressDollorValue }) {
  const classes = useStyles();

  return (
    <Box sx={{ width: '100%' }}>
      {SALES.map((progress, index) => {
        return (
          <Progress
            key={progress.label}
            progressValue={progressValue}
            progressDollorValue={progressDollorValue}
          />
        );
      })}
    </Box>
  );
}

export default SalesOverview;
