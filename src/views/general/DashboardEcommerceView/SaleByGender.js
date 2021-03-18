import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
// import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'src/utils/formatNumber';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const chartHeight = 392;
  const legendHeight = 72;
  return {
    root: {},
    chart: {
      height: chartHeight,
      marginTop: theme.spacing(2),
      '& .apexcharts-canvas svg': { height: chartHeight },
      '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
      },
      '& .apexcharts-legend': {
        height: legendHeight,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${chartHeight - legendHeight}px) !important`
      }
    }
  };
});

function SaleByGender({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const chartData = [44, 75];
  const chartOptions = merge(ApexChartsOption(), {
    labels: ['Mens', 'Womens'],
    legend: { floating: true, horizontalAlign: 'center' },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            {
              offset: 0,
              color: theme.palette.primary.light
            },
            {
              offset: 100,
              color: theme.palette.primary.main
            }
          ],
          [
            {
              offset: 0,
              color: theme.palette.warning.light
            },
            {
              offset: 100,
              color: theme.palette.warning.main
            }
          ]
        ]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: function (w) {
              return fNumber(2324);
            }
          }
        }
      }
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Sale By Gender" />
      <div dir="ltr">
        <ReactApexChart
          type="radialBar"
          series={chartData}
          options={chartOptions}
          height={310}
          className={classes.chart}
        />
      </div>
    </Card>
  );
}

SaleByGender.propTypes = {
  className: PropTypes.string
};

export default SaleByGender;
