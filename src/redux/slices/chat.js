import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import objFromArray from 'src/utils/objFromArray';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  contacts: { byId: {}, allIds: [] },
  conversations: { byId: {}, allIds: [] },
  activeConversationId: null,
  participants: [],
  recipients: [],
  isOpenSidebarConversation: true,
  isOpenSidebarInfo: true
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CONTACT SSUCCESS
    getContactsSuccess(state, action) {
      const contacts = action.payload;

      state.contacts.byId = objFromArray(contacts);
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },

    // GET CONVERSATIONS
    getConversationsSuccess(state, action) {
      const conversations = action.payload;

      state.conversations.byId = objFromArray(conversations);
      state.conversations.allIds = Object.keys(state.conversations.byId);
    },

    // GET CONVERSATION
    getConversationSuccess(state, action) {
      const conversation = action.payload;

      if (conversation) {
        state.conversations.byId[conversation.id] = conversation;
        state.activeConversationId = conversation.id;
        if (!state.conversations.allIds.includes(conversation.id)) {
          state.conversations.allIds.push(conversation.id);
        }
      } else {
        state.activeConversationId = null;
      }
    },

    // ON SEND MESSAGE
    onSendMessage(state, action) {
      const conversation = action.payload;
      const {
        conversationId,
        messageId,
        message,
        contentType,
        attachments,
        createdAt,
        senderId
      } = conversation;

      const newMessage = {
        id: messageId,
        body: message,
        contentType: contentType,
        attachments: attachments,
        createdAt: createdAt,
        senderId: senderId
      };

      state.conversations.byId[conversationId].messages.push(newMessage);
    },

    markConversationAsReadSuccess(state, action) {
      const { conversationId } = action.payload;
      const conversation = state.conversations.byId[conversationId];
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },

    // GET PARTICIPANTS
    getParticipantsSuccess(state, action) {
      const participants = action.payload;
      state.participants = participants;
    },

    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      state.activeConversationId = null;
    },

    addRecipient(state, action) {
      const recipients = action.payload;
      state.recipients = recipients;
    },

    // SIDEBAR
    onOpenSidebarConversation(state) {
      state.isOpenSidebarConversation = true;
    },

    onCloseSidebarConversation(state) {
      state.isOpenSidebarConversation = false;
    },

    onOpenSidebarInfo(state) {
      state.isOpenSidebarInfo = true;
    },

    onCloseSidebarInfo(state) {
      state.isOpenSidebarInfo = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addRecipient,
  onSendMessage,
  onOpenSidebarInfo,
  onCloseSidebarInfo,
  resetActiveConversation,
  onOpenSidebarConversation,
  onCloseSidebarConversation
} = slice.actions;

// ----------------------------------------------------------------------

export function getContacts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/contacts');
      dispatch(slice.actions.getContactsSuccess(response.data.contacts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversations() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/conversations');
      dispatch(
        slice.actions.getConversationsSuccess(response.data.conversations)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversation(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/conversation', {
        params: { conversationKey }
      });
      dispatch(
        slice.actions.getConversationSuccess(response.data.conversation)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function markConversationAsRead(conversationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.get('/api/chat/conversation/mark-as-seen', {
        params: { conversationId }
      });
      dispatch(slice.actions.markConversationAsReadSuccess({ conversationId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParticipants(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/participants', {
        params: { conversationKey }
      });
      dispatch(
        slice.actions.getParticipantsSuccess(response.data.participants)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
