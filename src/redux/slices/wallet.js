import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  activatingConnector: {}
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // WALLET ACTIVE
    setActivatingConnector(state, action) {
      state.activatingConnector = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setActivatingConnector } = slice.actions;
