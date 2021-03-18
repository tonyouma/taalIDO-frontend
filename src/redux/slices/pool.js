import { map } from 'lodash';
import axios from 'src/utils/axios';
// import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import mock from 'src/utils/mock';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  poolList: []
};

const slice = createSlice({
  name: 'pool',
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

    // GET POOLS
    getPoolListSuccess(state, action) {
      state.isLoading = false;
      state.poolList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export function getPoolList() {
  mock.restore();
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/pools');
      // result.poolsList = [...response.data];
      response.data.map((resp) => {
        resp.ratio = 0.03 + resp.id;
        resp.access = 'Private';
        resp.progress = (resp.id + 1) * 10;
      });
      dispatch(slice.actions.getPoolListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
