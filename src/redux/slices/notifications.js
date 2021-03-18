import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  notifications: []
};

const slice = createSlice({
  name: 'notifications',
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

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      const notifications = action.payload;
      state.notifications = notifications;
    },

    // MARK ALL AS READ
    markAllAsRead(state) {
      const markAll = state.notifications.map((notification) => {
        return {
          ...notification,
          isUnRead: false
        };
      });

      state.notifications = markAll;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { markAllAsRead } = slice.actions;

// ----------------------------------------------------------------------

export function getNotifications() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/notifications');
      dispatch(
        slice.actions.getNotificationsSuccess(response.data.notifications)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
