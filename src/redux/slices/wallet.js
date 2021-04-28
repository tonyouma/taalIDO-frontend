import { createSlice } from '@reduxjs/toolkit';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import talkData from '../../contracts/Talken.json';

// ----------------------------------------------------------------------

const initialState = {
  error: false,
  activatingConnector: {},
  account: null,
  balance: null,
  talBalance: null
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // WALLET ACTIVE
    setActivatingConnector(state, action) {
      state.activatingConnector = action.payload;
    },

    // BALANCE
    setBalance(state, action) {
      state.balance = action.payload;
    },

    // TAL BALANCE
    setTalBalance(state, action) {
      state.talBalance = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  hasError,
  setActivatingConnector,
  setBalance,
  setTalBalance
} = slice.actions;

// ----------------------------------------------------------------------

export function getWalletBalance(account, library) {
  return async (dispatch) => {
    try {
      if (!!account && !!library) {
        library
          .getBalance(account)
          .then((balance) => {
            // console.log('wallet account = ', account);
            // console.log('wallet balance = ', formatEther(balance));
            dispatch(slice.actions.setBalance(balance));
          })
          .catch(() => {
            dispatch(slice.actions.setBalance(null));
          });
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getContractDecimals(account, library) {
  return async (dispatch) => {
    try {
      if (!!library) {
        const talkAddr = '0x59d8562ec4f2e770505029dcc206f71448b43803';
        const talkContract = new Contract(
          talkAddr,
          ContractFactory.getInterface(talkData.abi),
          library.getSigner(account).connectUnchecked()
        );

        talkContract.functions.symbol().then((decimals) => {
          // console.log('---------> ' + decimals);
        });
      }
    } catch (error) {
      console.log('getContractDecimals', error);
    }
  };
}
