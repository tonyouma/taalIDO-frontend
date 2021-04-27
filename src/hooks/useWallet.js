import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { bscConnector, injected, walletconnect } from '../connectors';
import { instanceOf } from 'prop-types';

export function useEagerConnect() {
  // const { activate, active } = useWeb3React();
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const connectorId = window.localStorage.getItem('chainId');
    console.log('connectorId', connectorId);
    console.log('connector', connector);
    console.log('library', library);
    console.log('chainId', chainId);
    console.log('account', account);
    console.log('connectorId', error);

    if (connectorId && connectorId === 'klayton') {
      console.log('klayton');
      if (!window.klayton) {
        window.localStorage.removeItem('chainId');
        return;
      }
      window.klayton.enable();
    }
    if (connectorId && connectorId === 'injected') {
      console.log('injected');
      injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized) {
          console.log('injected11111');
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          console.log('injected22222');
          setTried(true);
        }
      });
    }
    if (connectorId && connectorId === 'walletconnect') {
      console.log('walletconnect');
      const wc = walletconnect(false);
      activate(wc);
    }
    if (connectorId && connectorId === 'bsc') {
      console.log('bsc', bscConnector);
      activate(bscConnector, undefined, true).catch(() => {
        // window.BinanceChain 의 로드가 느려서 1초후에 실행되도록 하였음.
        if (!window.BinanceChain)
          setTimeout(() => activate(bscConnector), 1000);
      });
    }
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const connectorId = window.localStorage.getItem('chainId');
    // if (!connectorId || connectorId !== 'injected') return;
    const { ethereum, BinanceChain } = window;
    // console.log('useInactiveListener', connectorId);
    // console.log('BinanceChain', BinanceChain);
    if (
      connectorId === 'injected' &&
      ethereum &&
      ethereum.on &&
      !active &&
      !error &&
      !suppress
    ) {
      // console.log('11111111111111');
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    } else if (
      connectorId === 'bsc' &&
      BinanceChain &&
      BinanceChain.on &&
      !active &&
      !error &&
      !suppress
    ) {
      // console.log('22222222222222');
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(bscConnector);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(bscConnector);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(bscConnector);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(bscConnector);
      };

      BinanceChain.on('connect', handleConnect);
      BinanceChain.on('chainChanged', handleChainChanged);
      BinanceChain.on('accountsChanged', handleAccountsChanged);
      BinanceChain.on('networkChanged', handleNetworkChanged);

      return () => {
        if (BinanceChain.removeListener) {
          BinanceChain.removeListener('connect', handleConnect);
          BinanceChain.removeListener('chainChanged', handleChainChanged);
          BinanceChain.removeListener('accountsChanged', handleAccountsChanged);
          BinanceChain.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}
