/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IInstaIndex,
  IInstaIndexInterface,
} from "../../../YemoVault/YemoVault.sol/IInstaIndex";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_accountVersion",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_origin",
        type: "address",
      },
    ],
    name: "build",
    outputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IInstaIndex__factory {
  static readonly abi = _abi;
  static createInterface(): IInstaIndexInterface {
    return new utils.Interface(_abi) as IInstaIndexInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IInstaIndex {
    return new Contract(address, _abi, signerOrProvider) as IInstaIndex;
  }
}
