import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';

// ----------------------------------------------------------------------

function AreaCharts() {
  const chartData = [
    { name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] },
    { name: 'series2', data: [11, 32, 45, 32, 34, 52, 41] }
  ];
  const chartOptions = merge(ApexChartsOption(), {
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z'
      ]
    },
    tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
  });

  return (
    <ReactApexChart
      type="area"
      series={chartData}
      options={chartOptions}
      height={320}
    />
  );
}

export default AreaCharts;
