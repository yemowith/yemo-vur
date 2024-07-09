/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  DSAthrt,
  DSAthrtInterface,
} from "../../../../../contracts/Ykit/DDSProxy/DDSPF.sol/DSAthrt";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "sig",
        type: "bytes4",
      },
    ],
    name: "canCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class DSAthrt__factory {
  static readonly abi = _abi;
  static createInterface(): DSAthrtInterface {
    return new utils.Interface(_abi) as DSAthrtInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DSAthrt {
    return new Contract(address, _abi, signerOrProvider) as DSAthrt;
  }
}