/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MockContract,
  MockContractInterface,
} from "../../../contracts/MOCKS/MockContract";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "FunctionCalled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "mockFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060c88061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806323bd32bf14602d575b600080fd5b603c6038366004607a565b603e565b005b60408051338152602081018390527f7ac96075df1d46e1066db459fa10ed8d609e9b019903029a772feade374281a7910160405180910390a150565b600060208284031215608b57600080fd5b503591905056fea2646970667358221220d3f36c3e4c365596eb950079beb60dc3a3826e51f5e7eb76628b5d3fd1b32f5264736f6c63430008140033";

type MockContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockContract__factory extends ContractFactory {
  constructor(...args: MockContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockContract> {
    return super.deploy(overrides || {}) as Promise<MockContract>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockContract {
    return super.attach(address) as MockContract;
  }
  override connect(signer: Signer): MockContract__factory {
    return super.connect(signer) as MockContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockContractInterface {
    return new utils.Interface(_abi) as MockContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockContract {
    return new Contract(address, _abi, signerOrProvider) as MockContract;
  }
}