import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { LatticeConnector } from '@web3-react/lattice-connector';
import { FrameConnector } from '@web3-react/frame-connector';
import { AuthereumConnector } from '@web3-react/authereum-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { MagicConnector } from '@web3-react/magic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { targetNetwork } from 'src/config';

const RPC_URL_1 =
  'https://mainnet.infura.io/v3/52a93bb82b3d407c9053bc7df92a4b4f';
const RPC_URL_3 =
  'https://ropsten.infura.io/v3/52a93bb82b3d407c9053bc7df92a4b4f';
const RPC_URL_4 =
  'https://rinkeby.infura.io/v3/52a93bb82b3d407c9053bc7df92a4b4f';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: RPC_URL_1,
  3: RPC_URL_3,
  4: RPC_URL_4
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const network = new NetworkConnector({
  urls: {
    1: RPC_URLS[1],
    3: RPC_URLS[3],
    4: RPC_URLS[4]
  },
  defaultChainId: parseInt(targetNetwork)
});

export const walletconnect = (useQR) => {
  const chainId = parseInt(targetNetwork);
  return new WalletConnectConnector({
    rpc: { chainId: RPC_URLS[chainId] },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: useQR,
    pollingInterval: POLLING_INTERVAL
  });
};

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'web3-react example'
});

export const ledger = new LedgerConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL
});

export const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: 'dummy@abc.xyz',
  manifestAppUrl: 'http://localhost:1234'
});

export const lattice = new LatticeConnector({
  chainId: 4,
  appName: 'web3-react',
  url: RPC_URLS[4]
});

export const frame = new FrameConnector({ supportedChainIds: [1] });

export const authereum = new AuthereumConnector({ chainId: 42 });

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.FORTMATIC_API_KEY,
  chainId: 4
});

export const magic = new MagicConnector({
  apiKey: process.env.MAGIC_API_KEY,
  chainId: 4,
  email: 'hello@example.org'
});

export const portis = new PortisConnector({
  dAppId: process.env.PORTIS_DAPP_ID,
  networks: [1, 100]
});

export const torus = new TorusConnector({ chainId: 1 });