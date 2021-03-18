import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import objFromArray from 'src/utils/objFromArray';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  mails: { byId: {}, allIds: [] },
  labels: [],
  isOpenSidebar: false,
  isOpenCompose: false
};

const slice = createSlice({
  name: 'mail',
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

    // GET LABELS
    getLabelsSuccess(state, action) {
      state.isLoading = false;
      state.labels = action.payload;
    },

    // GET MAILS
    getMailsSuccess(state, action) {
      const mails = action.payload;

      state.isLoading = false;
      state.mails.byId = objFromArray(mails);
      state.mails.allIds = Object.keys(state.mails.byId);
    },

    // GET MAIL
    getMailSuccess(state, action) {
      const mail = action.payload;

      state.mails.byId[mail.id] = mail;
      if (!state.mails.allIds.includes(mail.id)) {
        state.mails.allIds.push(mail.id);
      }
    },

    // SIDEBAR
    openSidebar(state) {
      state.isOpenSidebar = true;
    },

    closeSidebar(state) {
      state.isOpenSidebar = false;
    },

    // COMPOSE
    openCompose(state) {
      state.isOpenCompose = true;
    },

    closeCompose(state) {
      state.isOpenCompose = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  openSidebar,
  closeSidebar,
  openCompose,
  closeCompose
} = slice.actions;

// ----------------------------------------------------------------------

export function getLabels() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/labels');
      dispatch(slice.actions.getLabelsSuccess(response.data.labels));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMails(params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mails', { params });
      dispatch(slice.actions.getMailsSuccess(response.data.mails));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMail(mailId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mail', {
        params: { mailId }
      });
      dispatch(slice.actions.getMailSuccess(response.data.mail));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
