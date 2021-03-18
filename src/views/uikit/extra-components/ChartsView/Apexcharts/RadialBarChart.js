import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'src/utils/formatNumber';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const CHART_DATA = [44, 55];

function RadarBarChart() {
  const theme = useTheme();

  const chartOptions = merge(ApexChartsOption(), {
    labels: ['Apples', 'Oranges'],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 100, color: theme.palette.primary.main }
          ],
          [
            { offset: 0, color: theme.palette.warning.light },
            { offset: 100, color: theme.palette.warning.main }
          ]
        ]
      }
    },
    legend: { horizontalAlign: 'center' },
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
    <ReactApexChart
      type="radialBar"
      series={CHART_DATA}
      options={chartOptions}
      height={400}
    />
  );
}

export default RadarBarChart;
