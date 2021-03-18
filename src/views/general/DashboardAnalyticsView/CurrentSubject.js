import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const useStyles = makeStyles((theme) => ({
  root: {},
  chart: {
    height: CHART_HEIGHT,
    marginTop: theme.spacing(2),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
      overflow: 'visible'
    },
    '& .apexcharts-legend': {
      height: LEGEND_HEIGHT,
      alignContent: 'center',
      position: 'relative !important',
      borderTop: `solid 1px ${theme.palette.divider}`,
      top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
  }
}));

// ----------------------------------------------------------------------

CurrentSubject.propTypes = {
  className: PropTypes.string
};

function CurrentSubject({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const chartData = [
    { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
    { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
    { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] }
  ];
  const chartOptions = merge(ApexChartsOption(), {
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: [
        'English',
        'History',
        'Physics',
        'Geography',
        'Chinese',
        'Math'
      ],
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary
          ]
        }
      }
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Current Subject" />
      <div dir="ltr">
        <ReactApexChart
          type="radar"
          series={chartData}
          options={chartOptions}
          height={340}
          className={classes.chart}
        />
      </div>
    </Card>
  );
}

export default CurrentSubject;
