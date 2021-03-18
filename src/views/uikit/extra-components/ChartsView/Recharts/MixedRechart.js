import React from 'react';
import { ComposedChart, Bar, ResponsiveContainer, Area, Line } from 'recharts';
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
  { name: 'Page A', apple: 590, samsung: 800, microsoft: 1400 },
  { name: 'Page B', apple: 868, samsung: 967, microsoft: 1506 },
  { name: 'Page C', apple: 1397, samsung: 1098, microsoft: 989 },
  { name: 'Page D', apple: 1480, samsung: 1200, microsoft: 1228 },
  { name: 'Page E', apple: 1520, samsung: 1108, microsoft: 1100 },
  { name: 'Page F', apple: 1400, samsung: 680, microsoft: 1700 }
];

function MixedRechart() {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={360}>
      <ComposedChart
        data={CHART_DATA}
        margin={{ top: 0, right: 8, bottom: 0, left: 8 }}
      >
        <defs>
          <linearGradient id="areaBg" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={theme.palette.info.main}
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={theme.palette.info.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        {XAxisRecharts({ dataKey: 'name' })}
        {YAxisRecharts({})}
        {TooltipRecharts({ cursor: false })}
        {CartesianGridRecharts()}
        {LegendRecharts({ wrapperStyle: { paddingBottom: 24 } })}
        <Area
          dataKey="apple"
          type="monotone"
          strokeWidth={2}
          stroke={theme.palette.info.main}
          fillOpacity={0.16}
          fill="url(#areaBg)"
          activeDot={{ strokeWidth: 0, r: 6 }}
        />
        <Bar
          dataKey="samsung"
          barSize={8}
          fill={theme.palette.primary.main}
          radius={[10, 10, 0, 0]}
        />
        <Line
          dataKey="microsoft"
          dot={false}
          strokeWidth={2}
          type="monotone"
          stroke={theme.palette.warning.main}
          activeDot={{ strokeWidth: 0, r: 6 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default MixedRechart;
