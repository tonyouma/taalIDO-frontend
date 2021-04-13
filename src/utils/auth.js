import axios from 'axios';

export async function login({ creator, password, key }) {
  const response = await axios
    .post('http://taalswap.finance:3002/login', {
      creator,
      password,
      key
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
  return response.data;
}

export async function register({ creator, password, key }) {
  const response = await axios
    .post('http://taalswap.finance:3002/register', {
      creator,
      password,
      key
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
  return response.data;
}

export async function getMaxId() {
  const response = await axios
    .get('http://taalswap.finance:3002/pools?_sort=id&_order=desc&_limit=1')
    .catch((error) => {
      console.log(error);
      throw error;
    });
  return response.data[0] ? response.data[0].id + 1 : 1;
}
