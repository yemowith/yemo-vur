/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  SessionManager,
  SessionManagerInterface,
} from "../../../../../contracts/Ykit/Managers/SessionManager/SessionManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "SessionEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "SessionStarted",
    type: "event",
  },
  {
    inputs: [],
    name: "endSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
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
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "sessions",
    outputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expires",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "startSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061050b806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063431a1b97146100515780636ca0f814146100a757806377127612146100bc578063e237a3fc146100cf575b600080fd5b61008461005f36600461036c565b600060208190529081526040902080546001909101546001600160a01b039091169082565b604080516001600160a01b03909316835260208301919091520160405180910390f35b6100ba6100b53660046103a4565b6100d7565b005b6100ba6100ca366004610466565b610260565b6100ba6102f8565b336000818152602081905260409020546001600160a01b031681146101435760405162461bcd60e51b815260206004820152600e60248201527f4e6f7420617574686f72697a656400000000000000000000000000000000000060448201526064015b60405180910390fd5b6001600160a01b03811660009081526020819052604090206001015442106101ad5760405162461bcd60e51b815260206004820152600f60248201527f53657373696f6e20657870697265640000000000000000000000000000000000604482015260640161013a565b6000836001600160a01b0316836040516101c7919061047f565b6000604051808303816000865af19150503d8060008114610204576040519150601f19603f3d011682016040523d82523d6000602084013e610209565b606091505b505090508061025a5760405162461bcd60e51b815260206004820152601260248201527f5472616e73616374696f6e206661696c65640000000000000000000000000000604482015260640161013a565b50505050565b604080518082019091523381526020810161027b83426104ae565b905233600081815260208181526040918290208451815473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03909116178155938101516001909401939093555183815290917f6479f44bef3ce31847397612fb476f7f382288003bdebea81c5302f8bd819dd1910160405180910390a250565b33600081815260208190526040808220805473ffffffffffffffffffffffffffffffffffffffff19168155600101829055517f49fa048463c11173dbc8b2ab8d09ebe6c38c168737d5a622b65b8086a01cbd069190a2565b80356001600160a01b038116811461036757600080fd5b919050565b60006020828403121561037e57600080fd5b61038782610350565b9392505050565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156103b757600080fd5b6103c083610350565b9150602083013567ffffffffffffffff808211156103dd57600080fd5b818501915085601f8301126103f157600080fd5b8135818111156104035761040361038e565b604051601f8201601f19908116603f0116810190838211818310171561042b5761042b61038e565b8160405282815288602084870101111561044457600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60006020828403121561047857600080fd5b5035919050565b6000825160005b818110156104a05760208186018101518583015201610486565b506000920191825250919050565b808201808211156104cf57634e487b7160e01b600052601160045260246000fd5b9291505056fea2646970667358221220ef64910c689caed841b5ecfec737974d82b19e7bd4094762a1c90f28cdd38d2864736f6c63430008140033";

type SessionManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SessionManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SessionManager__factory extends ContractFactory {
  constructor(...args: SessionManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SessionManager> {
    return super.deploy(overrides || {}) as Promise<SessionManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SessionManager {
    return super.attach(address) as SessionManager;
  }
  override connect(signer: Signer): SessionManager__factory {
    return super.connect(signer) as SessionManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SessionManagerInterface {
    return new utils.Interface(_abi) as SessionManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SessionManager {
    return new Contract(address, _abi, signerOrProvider) as SessionManager;
  }
}
