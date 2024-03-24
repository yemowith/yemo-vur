/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IBOMBA,
  IBOMBAInterface,
} from "../../../YemoVur/interfc.sol/IBOMBA";

const _abi = [
  {
    inputs: [],
    name: "glstlqltamt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "vur",
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

export class IBOMBA__factory {
  static readonly abi = _abi;
  static createInterface(): IBOMBAInterface {
    return new utils.Interface(_abi) as IBOMBAInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IBOMBA {
    return new Contract(address, _abi, signerOrProvider) as IBOMBA;
  }
}
