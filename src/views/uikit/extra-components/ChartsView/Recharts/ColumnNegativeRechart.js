import React from 'react';
import { BarChart, Bar, ResponsiveContainer, ReferenceLine } from 'recharts';
import {
  XAxisRecharts,
  YAxisRecharts,
  LegendRecharts,
  TooltipRecharts,
  CartesianGridRecharts
} from 'src/components/Charts/Recharts';
import { useTheme, alpha } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Page A', male: 4000, female: 2400 },
  { name: 'Page B', male: 3000, female: 1398 },
  { name: 'Page C', male: 2000, female: 9800 },
  { name: 'Page D', male: 2780, female: 3908 },
  { name: 'Page E', male: 1890, female: 4800 },
  { name: 'Page F', male: 2390, female: 3800 },
  { name: 'Page G', male: 3490, female: 4300 }
];

function ColumnNegativeRechart() {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={CHART_DATA}
        margin={{ top: 0, right: 8, bottom: 0, left: 8 }}
        barSize={8}
        barGap={2}
      >
        {XAxisRecharts({ dataKey: 'name' })}
        {YAxisRecharts()}
        {TooltipRecharts({ cursor: false })}
        {CartesianGridRecharts()}
        {LegendRecharts({ wrapperStyle: { paddingBottom: 24 } })}
        <ReferenceLine y={0} strokeWidth={0} />
        <Bar
          dataKey="male"
          fill={theme.palette.primary.main}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="female"
          fill={alpha(theme.palette.primary.main, 0.4)}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ColumnNegativeRechart;
