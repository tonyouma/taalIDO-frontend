import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
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

function AreaStyle({ dataKey, color, ...other }) {
  return (
    <Area
      type="monotone"
      dataKey={dataKey}
      strokeWidth={2}
      stroke={color}
      fill={`url(#${dataKey})`}
      fillOpacity={0.16}
      activeDot={{ strokeWidth: 0, r: 6 }}
      {...other}
    />
  );
}

function Gradient({ id, color }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity={1} />
      <stop offset="100%" stopColor={color} stopOpacity={0} />
    </linearGradient>
  );
}

function AreaRechart() {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart
        data={CHART_DATA}
        margin={{ top: 0, right: 8, bottom: 0, left: 8 }}
      >
        <defs>
          {Gradient({ id: 'male', color: theme.palette.primary.main })}
          {Gradient({ id: 'female', color: theme.palette.warning.main })}
        </defs>
        {XAxisRecharts({ dataKey: 'name' })}
        {YAxisRecharts()}
        {TooltipRecharts()}
        {CartesianGridRecharts()}
        {LegendRecharts({ wrapperStyle: { paddingBottom: 24 } })}

        {AreaStyle({ dataKey: 'male', color: theme.palette.primary.main })}
        {AreaStyle({ dataKey: 'female', color: theme.palette.warning.main })}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaRechart;
