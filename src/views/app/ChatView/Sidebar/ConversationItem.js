import clsx from 'clsx';
import React from 'react';
import { last } from 'lodash';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import BadgeStatus from 'src/components/BadgeStatus';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 3),
    transition: theme.transitions.create('all')
  },
  listItemSelected: {
    backgroundColor: theme.palette.action.selected
  },
  avatar: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    '& .MuiAvatar-img': { borderRadius: '50%' },
    '& .MuiAvatar-root': { width: '100%', height: '100%' }
  },
  avatarGroup: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    '& $avatar': {
      position: 'absolute',
      width: AVATAR_SIZE_GROUP,
      height: AVATAR_SIZE_GROUP,
      '&:nth-child(1)': {
        zIndex: 9,
        left: 0,
        bottom: 2,
        '& .MuiAvatar-root': {
          border: `solid 2px ${theme.palette.background.paper}`
        }
      },
      '&:nth-child(2)': { top: 2, right: 0 }
    }
  },
  lastActivity: {
    fontSize: 12,
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1.25),
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

const getDetails = (conversation, currentUserId) => {
  const otherParticipants = conversation.participants.filter(
    (participant) => participant.id !== currentUserId
  );
  const displayNames = otherParticipants
    .reduce((names, participant) => [...names, participant.name], [])
    .join(', ');
  let displayText = '';
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';
    const message =
      lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;
    displayText = `${sender}${message}`;
  }
  return { otherParticipants, displayNames, displayText };
};

ConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  conversation: PropTypes.object.isRequired,
  isOpenSidebarConversation: PropTypes.bool,
  onSelectConversation: PropTypes.func,
  className: PropTypes.string
};

function ConversationItem({
  isSelected,
  conversation,
  onSelectConversation,
  isOpenSidebarConversation,
  className,
  ...other
}) {
  const classes = useStyles();
  const details = getDetails(
    conversation,
    '8864c717-587d-472a-929a-8e5f298024da-0'
  );

  const displayLastActivity = last(conversation.messages).createdAt;
  const isGroup = details.otherParticipants.length > 1;
  const isUnread = conversation.unreadCount > 0;
  const isOnlineGroup =
    isGroup &&
    details.otherParticipants.map((item) => item.status).includes('online');

  return (
    <ListItem
      button
      disableGutters
      onClick={onSelectConversation}
      className={clsx(
        classes.root,
        { [classes.listItemSelected]: isSelected },
        className
      )}
      {...other}
    >
      <ListItemAvatar>
        <div className={clsx({ [classes.avatarGroup]: isGroup })}>
          {details.otherParticipants.slice(0, 2).map((participant) => (
            <div className={classes.avatar} key={participant.id}>
              <Avatar alt={participant.name} src={participant.avatar} />
              {!isGroup && (
                <BadgeStatus
                  status={participant.status}
                  sx={{ right: 2, bottom: 2, position: 'absolute' }}
                />
              )}
            </div>
          ))}
          {isOnlineGroup && (
            <BadgeStatus
              status="online"
              sx={{ right: 2, bottom: 2, position: 'absolute' }}
            />
          )}
        </div>
      </ListItemAvatar>

      {isOpenSidebarConversation && (
        <>
          <ListItemText
            primary={details.displayNames}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2'
            }}
            secondary={details.displayText}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? 'subtitle2' : 'body2',
              color: isUnread ? 'textPrimary' : 'textSecondary'
            }}
          />

          <Box
            sx={{
              ml: 2,
              height: 44,
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column'
            }}
          >
            <div className={classes.lastActivity}>
              {formatDistanceToNowStrict(new Date(displayLastActivity), {
                addSuffix: false
              })}
            </div>
            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Box>
        </>
      )}
    </ListItem>
  );
}

export default ConversationItem;
