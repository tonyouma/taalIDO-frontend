import { useMemo, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract, ContractFactory } from '@ethersproject/contracts';

export function useContract(address, ABI, withSigner = false) {
  const context = useWeb3React();
  const { library, account } = context;

  const [contract, setContract] = useState();

  useEffect(() => {
    !!address && !!ABI && !!library
      ? setContract(
          new Contract(
            address,
            ContractFactory.getInterface(ABI),
            library.getSigner(account).connectUnchecked()
          )
        )
      : setContract(undefined);
  }, [address, ABI, withSigner, library, account]);

  return contract;

  // return useMemo(
  //   () =>
  //     !!address && !!ABI && !!library
  //       ? new Contract(
  //           address,
  //           ContractFactory.getInterface(ABI),
  //           withSigner ? library.getSigner(account).connectUnchecked() : library
  //         )
  //       : undefined,
  //   [address, ABI, withSigner, library, account]
  // );
}
