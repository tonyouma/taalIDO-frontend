import axios from 'axios';

export default async function getEthPrice(base) {
  let price;
  price = await axios
    .get(`https://api.coinbase.com/v2/prices/ETH-${base}/spot`)
    .catch((error) => {
      console.log(error);
      return null;
    });

  return price.data.data.amount;
}
