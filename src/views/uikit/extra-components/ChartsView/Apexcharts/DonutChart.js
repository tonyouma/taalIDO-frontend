import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
// ----------------------------------------------------------------------

const CHART_DATA = [44, 55, 13, 43];

function DonutChart() {
  const chartOptions = merge(ApexChartsOption(), {
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    stroke: { show: false },
    legend: { horizontalAlign: 'center' },
    plotOptions: { pie: { donut: { size: '90%' } } }
  });

  return (
    <ReactApexChart
      type="donut"
      series={CHART_DATA}
      options={chartOptions}
      width={400}
    />
  );
}

export default DonutChart;
