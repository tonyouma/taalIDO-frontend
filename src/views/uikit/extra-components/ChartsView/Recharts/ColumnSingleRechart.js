import React from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import {
  XAxisRecharts,
  YAxisRecharts,
  TooltipRecharts,
  CartesianGridRecharts
} from 'src/components/Charts/Recharts';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Page A', value: 4000 },
  { name: 'Page B', value: 3000 },
  { name: 'Page C', value: 2000 },
  { name: 'Page D', value: 2780 },
  { name: 'Page E', value: 1890 },
  { name: 'Page F', value: 2390 },
  { name: 'Page G', value: 3490 }
];

function ColumnSingleRechart() {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={CHART_DATA}
        margin={{ top: 0, right: 8, bottom: 0, left: 8 }}
        barSize={8}
      >
        {XAxisRecharts({ dataKey: 'name' })}
        {YAxisRecharts()}
        {TooltipRecharts({ cursor: false })}
        {CartesianGridRecharts()}
        <Bar
          dataKey="value"
          fill={theme.palette.primary.main}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ColumnSingleRechart;
