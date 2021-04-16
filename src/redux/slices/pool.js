import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isOpenModal: false,
  error: false,
  poolList: [],
  applicationList: [],
  update: {},
  maxId: 0
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
    },

    // OPEN MODAL
    openModal(state, action) {
      const row = action.payload;
      state.isOpenModal = true;
      state.selectedPool = row;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedPool = null;
    },

    // GET APPLICATIONS
    getApplicationListSuccess(state, action) {
      state.isLoading = false;
      state.applicationList = action.payload;
    },

    // CREATE APPLICATIONS
    createApplicationSuccess(state, action) {
      state.isLoading = false;
      state.update = action.payload;
    },

    // APPROVE APPLICATIONS
    updateApplicationSuccess(state, action) {
      state.isLoading = false;
      state.update = action.payload;
    },

    // GET SWAPS
    getSwapListSuccess(state, action) {
      state.isLoading = false;
      state.swapList = action.payload;
    },

    // CREATE SWAPS
    createSwapSuccess(state, action) {
      state.isLoading = false;
      state.update = action.payload;
    },

    // CREATE SWAPS
    getMaxIdSuccess(state, action) {
      state.isLoading = false;
      state.maxId = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal } = slice.actions;

export function getPoolList() {
  // mock.restore();
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'http://133.186.222.82:3003/pools?_sort=id&_order=desc'
      );
      // response.data.map((resp) => {
      //   resp.ratio = 0.03 + resp.id;
      //   resp.access = 'Private';
      //   resp.progress = (resp.id + 1) * 10;
      //   return resp;
      // });
      dispatch(slice.actions.getPoolListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getApplicationList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'http://133.186.222.82:3003/pools?_sort=id&_order=desc'
      );
      dispatch(slice.actions.getApplicationListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function searchApplicationListByCreator(creator) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'http://133.186.222.82:3003/pools?_sort=id&_order=desc&creator=' +
          creator
      );
      dispatch(slice.actions.getApplicationListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createApplication(newApplication, accessToken) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        'http://133.186.222.82:3003/pools',
        newApplication,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      dispatch(slice.actions.createApplicationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateApplication(id, updateItem, accessToken) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log(updateItem);
      console.log(id);
      console.log(accessToken);
      const response = await axios.patch(
        'http://taalswap.finance:3003/pools/' + id,
        updateItem,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log('response ' + response);
      dispatch(slice.actions.updateApplicationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSwapList(walletAddress) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'http://133.186.222.82:3003/swaps?walletAddress=' + walletAddress
      );
      dispatch(slice.actions.getSwapListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createSwap(newSwap) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        'http://133.186.222.82:3003/swaps',
        newSwap
      );
      dispatch(slice.actions.createSwapSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
