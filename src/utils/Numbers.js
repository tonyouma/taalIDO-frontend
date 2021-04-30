import moment from 'moment';
import accounting from 'accounting';
import dayjs from 'dayjs';
import { BigNumber } from 'ethers';

Number.prototype.noExponents = function () {
  var data = String(this).split(/[eE]/);
  if (data.length == 1) return data[0];

  var z = '',
    sign = this < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
};

class numbers {
  constructor() {}

  fromDayMonthYear(date) {
    let mom = moment().dayOfYear(date.day);
    mom.set('hour', date.hour);
    mom.set('year', date.year);
    return mom.format('ddd, hA');
  }

  fromSmartContractTimeToMinutes(time) {
    return dayjs.unix(time).toDate();
  }

  fromMinutesToSmartContracTime(time) {
    return time;
  }

  fromHex(hex) {
    return hex.toString();
  }

  toFloat(number) {
    return parseFloat(parseFloat(number).toFixed(2));
  }

  toFloat4(number) {
    return parseFloat(parseFloat(number).toFixed(4));
  }

  timeToSmartContractTime(time) {
    return parseInt(new Date(time).getTime() / 1000);
  }

  toDate(date) {
    let mom = moment().dayOfYear(date.day);
    mom.set('hour', date.hour);
    mom.set('year', date.year);
    return mom.unix();
  }

  toMoney(number) {
    return accounting.formatMoney(number, { symbol: 'EUR', format: '%v' });
  }

  toFormatBet(number) {
    return parseFloat(parseFloat(number).toFixed(6));
  }

  formatNumber(number) {
    return accounting.formatNumber(number);
  }

  toSmartContractDecimals(value, decimals) {
    let numberWithNoExponents = new Number(
      value * 10 ** decimals
    ).noExponents();
    return numberWithNoExponents;
  }

  fromBigNumberToInteger(value, decimals = 18) {
    return (value / Math.pow(10, decimals)) * 1000000000000000000;
  }

  fromDecimalsOnlySelect(value, decimals) {
    return Number(
      parseFloat(
        // eslint-disable-next-line no-undef
        BigNumber.from(value).toBigInt() / BigInt(10 ** decimals)
      ).toPrecision(decimals)
    ).noExponents();
  }

  fromDecimals(value, decimals) {
    return Number(
      parseFloat(value / 10 ** decimals).toPrecision(decimals)
    ).noExponents();
  }

  fromExponential(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = '0.' + new Array(e).join('0') + x.toString().substring(2);
      }
    } else {
      var h = parseInt(x.toString().split('+')[1]);
      if (h > 20) {
        h -= 20;
        x /= Math.pow(10, h);
        x += new Array(h + 1).join('0');
      }
    }
    return x;
  }
}
let Numbers = new numbers();

export default Numbers;
