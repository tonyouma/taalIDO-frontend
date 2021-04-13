import { merge } from 'lodash';
import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {}
}));

// ----------------------------------------------------------------------

AreaInstalled.propTypes = {
  className: PropTypes.string
};

function AreaInstalled({ className, ...other }) {
  const classes = useStyles();

  const chartData = [
    { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
    { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] }
  ];

  const chartOptions = merge(ApexChartsOption(), {
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep'
      ]
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Area Installed" subheader="(+43%) than last year" />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}

export default AreaInstalled;
