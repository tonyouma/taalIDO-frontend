export default function getMax(max, value) {
  let result = 0;
  if (max !== '' && value !== '') {
    // result = max * value * Math.pow(10, -18);
    result = max * value;
  }
  return result;
}
