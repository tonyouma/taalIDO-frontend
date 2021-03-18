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

function PieRechart() {
  const theme = useTheme();

  const Colors = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.primary.main
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        {LegendRecharts({
          layout: 'vertical',
          verticalAlign: 'middle',
          align: 'left',
          wrapperStyle: { paddingLeft: 64 }
        })}
        <Pie
          dataKey="value"
          data={CHART_DATA}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
        >
          {CHART_DATA.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={Colors[index]}
              stroke={theme.palette.background.paper}
              strokeWidth={2}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieRechart;
