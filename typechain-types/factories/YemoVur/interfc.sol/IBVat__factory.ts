/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IBVat, IBVatInterface } from "../../../YemoVur/interfc.sol/IBVat";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawWETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IBVat__factory {
  static readonly abi = _abi;
  static createInterface(): IBVatInterface {
    return new utils.Interface(_abi) as IBVatInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IBVat {
    return new Contract(address, _abi, signerOrProvider) as IBVat;
  }
}
