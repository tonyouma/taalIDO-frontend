import RoomInfo from './RoomInfo';
import MessageList from './MessageList';
import React, { useEffect } from 'react';
import { PATH_APP } from 'src/routes/paths';
import HeaderDetail from './HeaderDetail';
import MessageInput from './MessageInput';
import HeaderCompose from './HeaderCompose';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  addRecipient,
  onSendMessage,
  getConversation,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation
} from 'src/redux/slices/chat';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    overflow: 'hidden'
  }
}));

// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = conversations.byId[activeConversationId];
  if (conversation) {
    return conversation;
  }
  return {
    id: null,
    messages: [],
    participants: [],
    unreadMessages: 0
  };
};

function ChatWindow() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { conversationKey } = useParams();
  const {
    contacts,
    recipients,
    participants,
    activeConversationId
  } = useSelector((state) => state.chat);
  const conversation = useSelector((state) => conversationSelector(state));
  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';

  const displayParticipants = participants.filter(
    (item) => item.id !== '8864c717-587d-472a-929a-8e5f298024da-0'
  );

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(conversationKey));
      try {
        await dispatch(getConversation(conversationKey));
      } catch (error) {
        console.error(error);
        history.push(PATH_APP.app.chat.new);
      }
    };
    if (conversationKey) {
      getDetails();
    } else {
      if (activeConversationId) {
        dispatch(resetActiveConversation());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipient = (recipient) => {
    dispatch(addRecipient(recipient));
  };

  const handleSendMessage = async (value) => {
    try {
      dispatch(onSendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      {mode === 'DETAIL' ? (
        <HeaderDetail participants={displayParticipants} />
      ) : (
        <HeaderCompose
          recipients={recipients}
          contacts={Object.values(contacts.byId)}
          onAddRecipient={handleAddRecipient}
        />
      )}

      <Divider />

      <div className={classes.main}>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          <MessageList conversation={conversation} />

          <Divider />

          <MessageInput
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={pathname === '/app/chat/new'}
          />
        </Box>

        {mode === 'DETAIL' && (
          <RoomInfo
            conversation={conversation}
            participants={displayParticipants}
          />
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
