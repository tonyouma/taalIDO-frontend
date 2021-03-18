import React from 'react';
import { ComposedChart, Bar, ResponsiveContainer } from 'recharts';
import {
  XAxisRecharts,
  YAxisRecharts,
  TooltipRecharts,
  CartesianGridRecharts
} from 'src/components/Charts/Recharts';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Page A', value: 590 },
  { name: 'Page B', value: 868 },
  { name: 'Page C', value: 1397 },
  { name: 'Page D', value: 1480 },
  { name: 'Page E', value: 1520 },
  { name: 'Page F', value: 1400 }
];

function BarRechart() {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={360}>
      <ComposedChart layout="vertical" data={CHART_DATA}>
        {XAxisRecharts({ type: 'number' })}
        {YAxisRecharts({ dataKey: 'name', type: 'category' })}
        {TooltipRecharts({ cursor: false })}
        {CartesianGridRecharts()}
        <Bar
          dataKey="value"
          barSize={8}
          fill={theme.palette.primary.main}
          radius={[0, 10, 10, 0]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default BarRechart;
