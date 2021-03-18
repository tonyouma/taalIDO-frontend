import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { Icon } from '@iconify/react';
import { formatDistanceToNow } from 'date-fns';
import clockFill from '@iconify-icons/eva/clock-fill';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 2.5),
    '&:not(:last-child)': {
      marginBottom: 1
    }
  },
  isUnRead: {
    backgroundColor: theme.palette.action.selected
  }
}));

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_package.svg"
        />
      ),
      title: title
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_shipping.svg"
        />
      ),
      title: title
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_mail.svg"
        />
      ),
      title: title
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_chat.svg"
        />
      ),
      title: title
    };
  }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title: title
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  className: PropTypes.string
};

function NotificationItem({ notification, className }) {
  const classes = useStyles();
  const avatar = renderContent(notification).avatar;
  const title = renderContent(notification).title;

  return (
    <ListItem
      button
      to="#"
      disableGutters
      key={notification.id}
      component={RouterLink}
      className={clsx(
        classes.root,
        {
          [classes.isUnRead]: notification.isUnRead
        },
        className
      )}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box
              component={Icon}
              icon={clockFill}
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(new Date(notification.createdAt))}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default NotificationItem;
