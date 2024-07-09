/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IDDSP,
  IDDSPInterface,
} from "../../../../../contracts/Ykit/DDSProxy/DDSPF.sol/IDDSP";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bytes",
        name: "res",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IDDSP__factory {
  static readonly abi = _abi;
  static createInterface(): IDDSPInterface {
    return new utils.Interface(_abi) as IDDSPInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IDDSP {
    return new Contract(address, _abi, signerOrProvider) as IDDSP;
  }
}