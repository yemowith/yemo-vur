/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  YKitProxy,
  YKitProxyInterface,
} from "../../../../../contracts/Ykit/ContractFactory/ContractFactory.sol/YKitProxy";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "Received",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    name: "setImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50338061003757604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61004081610046565b50610096565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61039b806100a56000396000f3fe60806040526004361061005e5760003560e01c80638da5cb5b116100435780638da5cb5b14610192578063d784d426146101b0578063f2fde38b146101d0576100a3565b80635c60da1b14610141578063715018a61461017d576100a3565b366100a357604080516020808252600090820152339134917f606834f57405380c4fb88d1f4850326ad3885f014bab3b568dfbf7a041eef738910160405180910390a3005b6001546001600160a01b03168061011b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f496d706c656d656e746174696f6e206e6f74207365740000000000000000000060448201526064015b60405180910390fd5b3660008037600080366000845af43d6000803e80801561013a573d6000f35b3d6000fd5b005b34801561014d57600080fd5b50600154610161906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b34801561018957600080fd5b5061013f6101f0565b34801561019e57600080fd5b506000546001600160a01b0316610161565b3480156101bc57600080fd5b5061013f6101cb366004610335565b610204565b3480156101dc57600080fd5b5061013f6101eb366004610335565b61023b565b6101f8610292565b61020260006102d8565b565b61020c610292565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b610243610292565b6001600160a01b038116610286576040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260006004820152602401610112565b61028f816102d8565b50565b6000546001600160a01b03163314610202576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610112565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561034757600080fd5b81356001600160a01b038116811461035e57600080fd5b939250505056fea2646970667358221220d870690832b660a3d1f13b511df92e20fc43361e2243b2547ba79cd9700c2b8a64736f6c63430008140033";

type YKitProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YKitProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YKitProxy__factory extends ContractFactory {
  constructor(...args: YKitProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YKitProxy> {
    return super.deploy(overrides || {}) as Promise<YKitProxy>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): YKitProxy {
    return super.attach(address) as YKitProxy;
  }
  override connect(signer: Signer): YKitProxy__factory {
    return super.connect(signer) as YKitProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YKitProxyInterface {
    return new utils.Interface(_abi) as YKitProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YKitProxy {
    return new Contract(address, _abi, signerOrProvider) as YKitProxy;
  }
}
