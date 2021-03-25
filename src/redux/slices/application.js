import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  applicationList: []
};

const slice = createSlice({
  name: 'application',
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

    // GET APPLICATIONS
    getApplicationListSuccess(state, action) {
      state.isLoading = false;
      state.applicationList = action.payload;
    },

    // CREATE APPLICATIONS
    createApplicationSuccess(state, action) {
      state.isLoading = false;
      state.applicationList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export function getApplicationList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'http://133.186.222.82:3001/applications'
      );
      dispatch(slice.actions.getApplicationListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createApplication(newApplication) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        'http://localhost:3001/applications',
        newApplication
      );
      dispatch(slice.actions.createApplicationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
