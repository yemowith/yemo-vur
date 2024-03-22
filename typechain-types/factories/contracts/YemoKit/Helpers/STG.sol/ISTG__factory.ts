/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISTG,
  ISTGInterface,
} from "../../../../../contracts/YemoKit/Helpers/STG.sol/ISTG";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "group",
        type: "bytes32",
      },
    ],
    name: "DataStored",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
    ],
    name: "retrieveData",
    outputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "group",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "vrs",
            type: "uint256",
          },
        ],
        internalType: "struct ISTG.STGD",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "storeData",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ISTG__factory {
  static readonly abi = _abi;
  static createInterface(): ISTGInterface {
    return new utils.Interface(_abi) as ISTGInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ISTG {
    return new Contract(address, _abi, signerOrProvider) as ISTG;
  }
}
