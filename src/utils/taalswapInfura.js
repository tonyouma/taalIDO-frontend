import { Contract, ContractFactory } from '@ethersproject/contracts';
import { InfuraProvider } from '@ethersproject/providers';
import { fixedData, tokenData } from '../contracts';
import Numbers from './Numbers';

class TaalswapInfura {
  constructor({ tokenContractAddress }) {
    try {
      const provider = new InfuraProvider('Rinkeby');

      const tokenContract = new Contract(
        tokenContractAddress,
        ContractFactory.getInterface(tokenData.abi),
        provider
      );

      this.params = {
        tokenContract: tokenContract
      };
    } catch (e) {
      console.log('TaalswapInfura create error', e);
      throw e;
    }
  }

  getTokenContract() {
    return this.params.tokenContract;
  }

  /**
   * @function decimals
   * @description Get Decimals
   * @returns {Integer} Integer
   */
  async decimalsAsync() {
    return parseInt(await this.params.tokenContract.decimals());
  }

  /**
   * @function balancdOf
   * @description Get balance of an address
   * @returns {Integer} Integer
   */
  async balanceOf(address) {
    return Numbers.fromDecimals(
      await this.params.tokenContract.balanceOf(address),
      18
    );
  }

  /**
   * @function symbol
   * @description Get symbol
   * @returns {String} symbol
   */
  async symbolAsync() {
    return await this.params.tokenContract.symbol();
  }

  /**
   * @function name
   * @description Get name
   * @returns {String} name
   */
  async nameAsync() {
    return await this.params.tokenContract.name();
  }

  /**
   * @function totalSupply
   * @description Get totalSupply
   * @returns {Integer} totalSupply
   */
  async totalSupplyAsync() {
    return parseInt(await this.params.tokenContract.totalSupply());
  }
}
export default TaalswapInfura;
