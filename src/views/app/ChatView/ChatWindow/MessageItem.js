import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import LazySize from 'src/components/LazySize';
import { formatDistanceToNowStrict } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(3)
  },
  container: {
    display: 'flex',
    '&.styleMe': { marginLeft: 'auto' }
  },
  content: {
    maxWidth: 320,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.neutral,
    '&.styleMe': {
      color: theme.palette.grey[800],
      backgroundColor: theme.palette.primary.lighter
    }
  },
  info: {
    display: 'flex',
    marginBottom: theme.spacing(0.75),
    color: theme.palette.text.secondary,
    '&.styleMe': { justifyContent: 'flex-end' }
  }
}));

// ----------------------------------------------------------------------

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired,
  className: PropTypes.string
};

function MessageItem({
  message,
  conversation,
  onOpenLightbox,
  className,
  ...other
}) {
  const classes = useStyles();

  const sender = conversation.participants.find(
    (participant) => participant.id === message.senderId
  );
  const senderDetails =
    message.senderId === '8864c717-587d-472a-929a-8e5f298024da-0'
      ? { type: 'me' }
      : { avatar: sender.avatar, name: sender.name };

  const isMe = senderDetails.type === 'me';
  const isImage = message.contentType === 'image';
  const firstName = senderDetails.name && senderDetails.name.split(' ')[0];

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <div className={clsx(classes.container, isMe && 'styleMe')}>
        {senderDetails.type !== 'me' && (
          <Avatar
            alt={senderDetails.name}
            src={senderDetails.avatar}
            sx={{ width: 32, height: 32 }}
          />
        )}
        <Box sx={{ ml: 2 }}>
          <Typography
            noWrap
            variant="caption"
            className={clsx(classes.info, isMe && 'styleMe')}
          >
            {!isMe && `${firstName},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true
            })}
          </Typography>

          <div className={clsx(classes.content, isMe && 'styleMe')}>
            {isImage ? (
              <LazySize
                alt="attachment"
                src={message.body.small}
                onClick={() => onOpenLightbox(message.body.large)}
                sx={{
                  width: '100%',
                  height: 200,
                  borderRadius: 1,
                  cursor: 'pointer'
                }}
              />
            ) : (
              <Typography variant="body2">{message.body}</Typography>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}

export default MessageItem;
