/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type { PY, PYInterface } from "../../../../YemoKit/Helpers/PY.sol/PY";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161030538038061030583398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610272806100936000396000f3fe6080604052600436106100385760003560e01c80635c60da1b146101015780638da5cb5b1461013d578063d784d4261461015d5761007d565b3661007d57604080516020808252600090820152339134917f606834f57405380c4fb88d1f4850326ad3885f014bab3b568dfbf7a041eef738910160405180910390a3005b6001546001600160a01b0316806100db5760405162461bcd60e51b815260206004820152601960248201527f496d706c656d656e746174696f6e206e6f74207365747465640000000000000060448201526064015b60405180910390fd5b3660008037600080366000845af43d6000803e8080156100fa573d6000f35b3d6000fd5b005b34801561010d57600080fd5b50600154610121906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b34801561014957600080fd5b50600054610121906001600160a01b031681565b34801561016957600080fd5b506100ff61017836600461020c565b6000546001600160a01b031633146101d25760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064016100d2565b600180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b60006020828403121561021e57600080fd5b81356001600160a01b038116811461023557600080fd5b939250505056fea2646970667358221220f6f69b0f2f866955a0dbc7abe8e2af290df2b02594ecd1fa98d203023bcb973364736f6c63430008140033";

type PYConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PYConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PY__factory extends ContractFactory {
  constructor(...args: PYConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PY> {
    return super.deploy(_owner, overrides || {}) as Promise<PY>;
  }
  override getDeployTransaction(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_owner, overrides || {});
  }
  override attach(address: string): PY {
    return super.attach(address) as PY;
  }
  override connect(signer: Signer): PY__factory {
    return super.connect(signer) as PY__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PYInterface {
    return new utils.Interface(_abi) as PYInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): PY {
    return new Contract(address, _abi, signerOrProvider) as PY;
  }
}