/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  DSAuthority,
  DSAuthorityInterface,
} from "../../../../../contracts/YemoKit/Helpers/DDSP.sol/DSAuthority";

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

export class DSAuthority__factory {
  static readonly abi = _abi;
  static createInterface(): DSAuthorityInterface {
    return new utils.Interface(_abi) as DSAuthorityInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DSAuthority {
    return new Contract(address, _abi, signerOrProvider) as DSAuthority;
  }
}
