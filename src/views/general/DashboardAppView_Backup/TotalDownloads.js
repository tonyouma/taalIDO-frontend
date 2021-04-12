import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';
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
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5)
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

TotalDownloads.propTypes = {
  className: PropTypes.string
};

const PERCENT = -0.06;
const TOTAL_DOWNLOAD = 678;

function TotalDownloads({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const chartData = [{ data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] }];
  const chartOptions = {
    colors: [theme.palette.info.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', endingShape: 'rounded' } },
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
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
  };

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Total Downloads</Typography>

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
          <Typography
            component="span"
            variant="subtitle2"
            color={PERCENT >= 0 ? 'primary' : 'error'}
          >
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
        </div>

        <Typography variant="h3">{fNumber(TOTAL_DOWNLOAD)}</Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={chartData}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
}

export default TotalDownloads;
