import React from 'react';
import { LegendRecharts } from 'src/components/Charts/Recharts';
import { ResponsiveContainer, RadialBarChart, RadialBar, Cell } from 'recharts';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: '18-24', value: 2400 },
  { name: '25-29', value: 4567 },
  { value: 6000 }
];

function RadialBarRechart() {
  const theme = useTheme();

  const Colors = [
    theme.palette.warning.main,
    theme.palette.primary.main,
    theme.palette.background.paper
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadialBarChart
        data={CHART_DATA}
        innerRadius="76%"
        outerRadius="116%"
        startAngle={90 + 360}
        endAngle={90}
        barSize={12}
      >
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          style={{
            fill: theme.palette.text.primary,
            fontSize: theme.typography.h4.fontSize,
            fontWeight: theme.typography.fontWeightBold
          }}
        >
          Total
        </text>
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          style={{
            fill: theme.palette.text.secondary,
            fontSize: theme.typography.body2.fontSize
          }}
        >
          23.000
        </text>

        {LegendRecharts({
          align: 'center',
          wrapperStyle: { paddingBottom: 64 }
        })}

        <RadialBar
          dataKey="value"
          label={false}
          background={{ fill: theme.palette.grey[500_16] }}
          cornerRadius={10}
          isAnimationActive={false}
        >
          {CHART_DATA.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={Colors[index]} />
          ))}
        </RadialBar>
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default RadialBarRechart;
