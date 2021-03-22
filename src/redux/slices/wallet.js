import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from '@web3-react/core';
import { formatEther } from '@ethersproject/units';

// ----------------------------------------------------------------------

const initialState = {
  error: false,
  activatingConnector: {},
  account: null,
  balance: null
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
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, setActivatingConnector, setBalance } = slice.actions;

// ----------------------------------------------------------------------

// export function GeWalletBalance() {
//   const { account, library, chainId } = useWeb3React();
//   return async (dispatch) => {
//     try {
//       if (!!account && !!library) {
//         let stale = false;
//
//         library
//           .getBalance(account)
//           .then((balance) => {
//             if (!stale) {
//               dispatch(slice.actions.setBalance(balance));
//             }
//           })
//           .catch(() => {
//             if (!stale) {
//               dispatch(slice.actions.setBalance(null));
//             }
//           });
//
//         return () => {
//           stale = true;
//           dispatch(slice.actions.setBalance(undefined));
//         };
//       }
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

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
