import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from '@web3-react/core';
import Web3 from 'web3';
import {
  Contract,
  ContractFactory,
  ContractInterface
} from '@ethersproject/contracts';
import { formatEther } from '@ethersproject/units';
import talkData from '../../contracts/Talken';
import fsData from '../../contracts/FixedSwap';

// ----------------------------------------------------------------------

const initialState = {
  error: false,
  activatingConnector: {},
  account: null,
  balance: null
};

const ethers = require('ethers');

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

export function getContractDecimals(account, library) {
  return async (dispatch) => {
    try {
      if (!!library) {
        const talkAddr = '0x59d8562ec4f2e770505029dcc206f71448b43803';
        const fsAddr = '0x0d0b0261Bbf7072425813b0c98B0A61182e7e1c7';
        const tttAddr = '0x31EdEEd92d51F825F146bba79B4357989A9B8240';
        const talkContract = new Contract(
          talkAddr,
          ContractFactory.getInterface(talkData.abi),
          library.getSigner(account).connectUnchecked()
        );

        talkContract.functions.symbol().then((decimals) => {
          console.log('---------> ' + decimals);
        });

        const fsCont = new Contract(
          tttAddr,
          ContractFactory.getInterface(fsData.abi),
          library.getSigner(account).connectUnchecked()
        );

        // fsCont.getBuyers().then((ret) => {
        //   console.log(ret);
        // });

        // const amount = ethers.BigNumber.from('148');
        // fsCont
        //   .swap(1000000, {
        //     value: amount,
        //     gasLimit: 3000000,
        //     gasPrice: 10000000000
        //   })
        //   .then((resp) => {
        //     console.log('---------> ' + resp.hash);
        //   });
        console.log('last !!');
      }
    } catch (error) {
      console.log('@@@@@@@@@@@@@@@@@@@@', error);
    }
  };
}
