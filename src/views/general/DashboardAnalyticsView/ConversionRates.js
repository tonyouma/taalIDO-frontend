import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'src/utils/formatNumber';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardHeader } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    paddingTop: 0,
    paddingBottom: '0 !important'
  }
}));

// ----------------------------------------------------------------------

ConversionRates.propTypes = {
  className: PropTypes.string
};

function ConversionRates({ className, ...other }) {
  const classes = useStyles();

  const chartData = [
    { data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }
  ];
  const chartOptions = merge(ApexChartsOption(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: function (seriesName) {
            return '#';
          }
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', endingShape: 'rounded' }
    },
    xaxis: {
      categories: [
        'Italy',
        'Japan',
        'China',
        'Canada',
        'France',
        'Germany',
        'South Korea',
        'Netherlands',
        'United States',
        'United Kingdom'
      ]
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Conversion Rates" subheader="(+43%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}

export default ConversionRates;
