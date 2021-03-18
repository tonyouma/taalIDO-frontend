import React from 'react';
import { LegendRecharts } from 'src/components/Charts/Recharts';
import {
  Radar,
  PolarGrid,
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 }
];

function RadarRechart() {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={CHART_DATA} outerRadius={120}>
        <PolarGrid stroke={theme.palette.divider} />
        <PolarAngleAxis
          dataKey="subject"
          tickLine={false}
          tick={{
            fill: theme.palette.text.secondary,
            fontSize: 12
          }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 150]}
          stroke={theme.palette.text.secondary}
        />
        <Radar
          name="Mike"
          dataKey="A"
          stroke={theme.palette.primary.main}
          fill={theme.palette.primary.main}
          fillOpacity={0.48}
        />
        <Radar
          name="Lily"
          dataKey="B"
          stroke={theme.palette.warning.main}
          fill={theme.palette.warning.main}
          fillOpacity={0.48}
        />

        {LegendRecharts({
          verticalAlign: 'bottom',
          align: 'center',
          wrapperStyle: { paddingTop: 24 }
        })}
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default RadarRechart;
