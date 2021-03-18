import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ConversationItem from './ConversationItem';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {}
}));

// ----------------------------------------------------------------------

ConversationList.propTypes = {
  conversations: PropTypes.object,
  isOpenSidebarConversation: PropTypes.bool,
  activeConversationId: PropTypes.string,
  className: PropTypes.string
};

function ConversationList({
  conversations,
  isOpenSidebarConversation,
  activeConversationId,
  className,
  ...other
}) {
  const classes = useStyles();
  const history = useHistory();

  const handleSelectConversation = (conversationId) => {
    let conversationKey = '';
    const conversation = conversations.byId[conversationId];
    if (conversation.type === 'GROUP') {
      conversationKey = conversation.id;
    } else {
      const otherParticipant = conversation.participants.find(
        (participant) =>
          participant.id !== '8864c717-587d-472a-929a-8e5f298024da-0'
      );
      conversationKey = otherParticipant.username;
    }
    history.push(`/app/chat/${conversationKey}`);
  };

  return (
    <List disablePadding className={clsx(classes.root, className)} {...other}>
      {conversations.allIds.map((conversationId) => (
        <ConversationItem
          key={conversationId}
          isOpenSidebarConversation={isOpenSidebarConversation}
          conversation={conversations.byId[conversationId]}
          isSelected={activeConversationId === conversationId}
          onSelectConversation={() => handleSelectConversation(conversationId)}
        />
      ))}
    </List>
  );
}

export default ConversationList;
