const hdKey = require('ethereumjs-wallet/hdkey');

// const extPubKey = 'xpub6CuvTtuACQaZjgDGWiJaK3cgLtKn9nvC9FwXnxAxoZ5uR1NpaG54zNgbsEiFP7TB4gwedHPQ3ZPtbkzWWC5jYGrxUwdd59YfssbwbMo6jcC';

export default function getEthAddress(extPubKey) {
  const hdWallet = hdKey.fromExtendedKey(extPubKey);

  // const wallet = hdWallet.getWallet();
  // const address = wallet.getAddress();
  // return `0x${address.toString('hex')}`;

  const hdPath = 'm/44/60/0/1/0';
  const node = hdWallet.derivePath(hdPath);
  const nodeWallet = node.getWallet();
  const address = nodeWallet.getAddressString();
  return address;
}
