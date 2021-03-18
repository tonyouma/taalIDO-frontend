import { last } from 'lodash';
import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { fDateTime } from 'src/utils/formatTime';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardHeader, CardContent } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator
} from '@material-ui/lab';
import { MTimelineDot } from 'src/theme';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: '1983, orders, $4220',
    time: faker.date.past(),
    type: 'order1'
  },
  {
    title: '12 Invoices have been paid',
    time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'Order #37745 from September',
    time: faker.date.past(),
    type: 'order3'
  },
  {
    title: 'New order placed #XF-2356',
    time: faker.date.past(),
    type: 'order4'
  },
  {
    title: 'New order placed #XF-2346',
    time: faker.date.past(),
    type: 'order5'
  }
];

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTimelineItem-missingOppositeContent:before': {
      display: 'none'
    }
  }
}));

// ----------------------------------------------------------------------

function OrderItem({ item, lastItem }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <MTimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {lastItem === item ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

OrderTimeline.propTypes = {
  className: PropTypes.string
};

function OrderTimeline({ className, ...other }) {
  const classes = useStyles();
  const lastItem = last(TIMELINES);

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline align="left" style={{ alignItems: 'flex-start', padding: 0 }}>
          {TIMELINES.map((item) => (
            <OrderItem key={item.title} item={item} lastItem={lastItem} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

export default OrderTimeline;
