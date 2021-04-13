const bjs = require('bitcoinjs-lib');
const bip32 = require('bip32');
const hdKey = require('ethereumjs-wallet/hdkey');

// const xPub = 'xpub6CuvTtuACQaZjgDGWiJaK3cgLtKn9nvC9FwXnxAxoZ5uR1NpaG54zNgbsEiFP7TB4gwedHPQ3ZPtbkzWWC5jYGrxUwdd59YfssbwbMo6jcC';
// const extPubKey = 'xpub6CuvTtuACQaZjgDGWiJaK3cgLtKn9nvC9FwXnxAxoZ5uR1NpaG54zNgbsEiFP7TB4gwedHPQ3ZPtbkzWWC5jYGrxUwdd59YfssbwbMo6jcC';

// export async function getUnusedAddress(xpub, index = 0) {
//   const { address } = bjs.payments.p2pkh({
//     pubkey: bip32.fromBase58(xpub).derive(0).derive(index).publicKey
//   });
//   const { n_tx } = await GET({
//     url: 'https://blockchain.info/rawaddr/' + address
//   });
//   if (!!n_tx) return getUnusedAddress(xpub, index + 1);
//   // You can store the index to the db here for the next requests
//   return address;
// }

// export default function getEthAddress(xPub) {
//   const { address } = bjs.payments.p2sh({
//     redeem: bjs.payments.p2wpkh({
//       pubkey: bip32.fromBase58(xPub).derive(0).derive(1).publicKey
//     })
//   });
//
//   console.log('------------>', address);
//   return address;
// }

export default function getEthAddress(extPubKey) {
  const hdWallet = hdKey.fromExtendedKey(extPubKey);
  const wallet = hdWallet.getWallet();
  const address = wallet.getAddress();
  return `0x${address.toString('hex')}`;
}
