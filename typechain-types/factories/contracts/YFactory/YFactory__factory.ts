/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  YFactory,
  YFactoryInterface,
} from "../../../contracts/YFactory/YFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561020d806100326000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80638da5cb5b1461003b578063a6f9dae11461006a575b600080fd5b60005461004e906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61007d6100783660046101a7565b61007f565b005b6000546001600160a01b031633146100de5760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064015b60405180910390fd5b6001600160a01b0381166101345760405162461bcd60e51b815260206004820152601d60248201527f4e6577206f776e657220697320746865207a65726f206164647265737300000060448201526064016100d5565b600080546040516001600160a01b03808516939216917fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c91a3600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6000602082840312156101b957600080fd5b81356001600160a01b03811681146101d057600080fd5b939250505056fea2646970667358221220af7904ea3962fe72a497400aca8da217eabc10c600cbda0aa20c20d02981cb9264736f6c63430008140033";

type YFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YFactory__factory extends ContractFactory {
  constructor(...args: YFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YFactory> {
    return super.deploy(overrides || {}) as Promise<YFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): YFactory {
    return super.attach(address) as YFactory;
  }
  override connect(signer: Signer): YFactory__factory {
    return super.connect(signer) as YFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YFactoryInterface {
    return new utils.Interface(_abi) as YFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YFactory {
    return new Contract(address, _abi, signerOrProvider) as YFactory;
  }
}
