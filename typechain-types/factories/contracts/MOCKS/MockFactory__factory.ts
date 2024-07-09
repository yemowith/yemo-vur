/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MockFactory,
  MockFactoryInterface,
} from "../../../contracts/MOCKS/MockFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    name: "ERC20TokenCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
    ],
    name: "createERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastCreatedToken",
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
    name: "lastCreatedToken",
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
  "0x608060405234801561001057600080fd5b50610232806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806352e49cbb14610046578063bfa126bb1461008f578063d665cf21146100ad575b600080fd5b6000546100669073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b60005473ffffffffffffffffffffffffffffffffffffffff16610066565b6100c06100bb36600461017e565b505050565b005b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f83011261010257600080fd5b813567ffffffffffffffff8082111561011d5761011d6100c2565b604051601f8301601f19908116603f01168101908282118183101715610145576101456100c2565b8160405283815286602085880101111561015e57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060006060848603121561019357600080fd5b833567ffffffffffffffff808211156101ab57600080fd5b6101b7878388016100f1565b945060208601359150808211156101cd57600080fd5b506101da868287016100f1565b925050604084013560ff811681146101f157600080fd5b80915050925092509256fea2646970667358221220de14f182dd3582c25a4760163a42f11980e0e5fdfee0a4f472c7fbf2ef2224bb64736f6c63430008140033";

type MockFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockFactory__factory extends ContractFactory {
  constructor(...args: MockFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockFactory> {
    return super.deploy(overrides || {}) as Promise<MockFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockFactory {
    return super.attach(address) as MockFactory;
  }
  override connect(signer: Signer): MockFactory__factory {
    return super.connect(signer) as MockFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockFactoryInterface {
    return new utils.Interface(_abi) as MockFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockFactory {
    return new Contract(address, _abi, signerOrProvider) as MockFactory;
  }
}
