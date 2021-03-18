import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Desktops', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }
];

function LineChart() {
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
    },
    tooltip: { x: { show: false }, marker: { show: false } }
  });

  return (
    <ReactApexChart
      type="line"
      series={CHART_DATA}
      options={chartOptions}
      height={320}
    />
  );
}

export default LineChart;
