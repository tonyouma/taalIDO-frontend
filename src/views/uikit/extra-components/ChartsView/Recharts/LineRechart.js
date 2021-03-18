import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import {
  XAxisRecharts,
  YAxisRecharts,
  LegendRecharts,
  TooltipRecharts,
  CartesianGridRecharts
} from 'src/components/Charts/Recharts';
import { useTheme } from '@material-ui/core/styles';

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

function LineStyle({ dataKey, color, ...other }) {
  return (
    <Line
      type="monotone"
      dataKey={dataKey}
      strokeWidth={2}
      stroke={color}
      dot={false}
      activeDot={{
        strokeWidth: 0,
        r: 6
      }}
      {...other}
    />
  );
}

function LineRechart() {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={360}>
      <LineChart
        data={CHART_DATA}
        margin={{ top: 0, right: 8, bottom: 0, left: 8 }}
      >
        {XAxisRecharts({ dataKey: 'name' })}
        {YAxisRecharts()}
        {TooltipRecharts()}
        {CartesianGridRecharts()}
        {LegendRecharts({
          wrapperStyle: { paddingTop: 24 },
          verticalAlign: 'bottom',
          align: 'center'
        })}

        {LineStyle({ dataKey: 'male', color: theme.palette.primary.main })}
        {LineStyle({ dataKey: 'female', color: theme.palette.warning.main })}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineRechart;
