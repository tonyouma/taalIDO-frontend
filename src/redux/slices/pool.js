import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  poolList: [],
  applicationList: [],
  update: {}
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
      const response = await axios.get('http://133.186.222.82:3001/pools');
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
      const response = await axios.get('http://133.186.222.82:3001/pools');
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
        'http://133.186.222.82:3001/pools?creator_lte=' + creator
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
        'http://133.186.222.82:3001/pools',
        newApplication
      );
      dispatch(slice.actions.createApplicationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateApplication(id, updateItem, creator, secret) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(
        'http://133.186.222.82:3001/pools/' + id,
        updateItem,
        {
          auth: {
            creator: creator,
            secret: secret
          }
        }
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
        'http://133.186.222.82:3001/swaps?walletAddress=' + walletAddress
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
        'http://133.186.222.82:3001/swaps',
        newSwap
      );
      dispatch(slice.actions.createSwapSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
