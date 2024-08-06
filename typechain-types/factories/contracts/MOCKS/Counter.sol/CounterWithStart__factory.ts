/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  CounterWithStart,
  CounterWithStartInterface,
} from "../../../../contracts/MOCKS/Counter.sol/CounterWithStart";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "count",
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
    inputs: [],
    name: "decrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
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
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161018b38038061018b83398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b61012c8061005f6000396000f3fe6080604052348015600f57600080fd5b506004361060465760003560e01c806306661abd14604b5780632baeceb7146065578063a87d942c14606d578063d09de08a146074575b600080fd5b605360005481565b60405190815260200160405180910390f35b606b607a565b005b6000546053565b606b6091565b6001600080828254608a919060d0565b9091555050565b6001600080828254608a919060e6565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8181038181111560e05760e060a1565b92915050565b8082018082111560e05760e060a156fea2646970667358221220ed688a3c3662c2cd674cc2ace7e9af13ebd2f1f94a53d8ff39924eba210c96b564736f6c63430008140033";

type CounterWithStartConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CounterWithStartConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CounterWithStart__factory extends ContractFactory {
  constructor(...args: CounterWithStartConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _start: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CounterWithStart> {
    return super.deploy(_start, overrides || {}) as Promise<CounterWithStart>;
  }
  override getDeployTransaction(
    _start: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_start, overrides || {});
  }
  override attach(address: string): CounterWithStart {
    return super.attach(address) as CounterWithStart;
  }
  override connect(signer: Signer): CounterWithStart__factory {
    return super.connect(signer) as CounterWithStart__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CounterWithStartInterface {
    return new utils.Interface(_abi) as CounterWithStartInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CounterWithStart {
    return new Contract(address, _abi, signerOrProvider) as CounterWithStart;
  }
}