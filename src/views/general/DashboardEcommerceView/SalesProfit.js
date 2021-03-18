import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  trending: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  trendingIcon: {
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.16)
  },
  isTrendingDown: {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.16)
  }
}));

// ----------------------------------------------------------------------

SalesProfit.propTypes = {
  className: PropTypes.string
};

const PERCENT = 0.06;
const TOTAL_SALES = 4876;

function SalesProfit({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const chartData = [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }];
  const chartOptions = merge(ApexChartsOption(), {
    colors: [theme.palette.error.main],
    chart: { animations: { enabled: true }, sparkline: { enabled: true } },
    stroke: { width: 2 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: function (seriesName) {
            return '';
          }
        }
      },
      marker: { show: false }
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Sales Profit
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(TOTAL_SALES)}
        </Typography>

        <div className={classes.trending}>
          <div
            className={clsx(classes.trendingIcon, {
              [classes.isTrendingDown]: PERCENT < 0
            })}
          >
            <Icon
              width={16}
              height={16}
              icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
            />
          </div>
          <Typography variant="subtitle2" component="span">
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ color: 'text.secondary' }}
          >
            &nbsp;than last week
          </Typography>
        </div>
      </Box>

      <ReactApexChart
        type="line"
        series={chartData}
        options={chartOptions}
        width={120}
        height={80}
      />
    </Card>
  );
}

export default SalesProfit;
