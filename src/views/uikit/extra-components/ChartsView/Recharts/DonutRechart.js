import React from 'react';
import { ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { LegendRecharts } from 'src/components/Charts/Recharts';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
];

function DonutRechart() {
  const theme = useTheme();

  const Colors = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.primary.darker
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <text
          x="40%"
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
          x="40%"
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
          layout: 'vertical',
          verticalAlign: 'middle',
          align: 'right',
          wrapperStyle: { width: 120 }
        })}

        <Pie
          data={CHART_DATA}
          dataKey="value"
          label
          innerRadius={120 - 12}
          outerRadius={120}
        >
          {CHART_DATA.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={Colors[index]}
              stroke={theme.palette.background.paper}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DonutRechart;
