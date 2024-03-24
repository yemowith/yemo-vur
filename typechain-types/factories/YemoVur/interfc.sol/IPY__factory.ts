/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IPY, IPYInterface } from "../../../YemoVur/interfc.sol/IPY";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_implt",
        type: "address",
      },
    ],
    name: "setimplt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IPY__factory {
  static readonly abi = _abi;
  static createInterface(): IPYInterface {
    return new utils.Interface(_abi) as IPYInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IPY {
    return new Contract(address, _abi, signerOrProvider) as IPY;
  }
}