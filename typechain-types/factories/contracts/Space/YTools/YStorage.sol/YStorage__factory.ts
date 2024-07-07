/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  YStorage,
  YStorageInterface,
} from "../../../../../contracts/Space/YTools/YStorage.sol/YStorage";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
    inputs: [
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
    ],
    name: "getData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
      },
    ],
    name: "setData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b0319338181169190921617179055610726806100396000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80636c67bdfa146100515780638da5cb5b14610066578063a6f9dae114610096578063ae55c888146100a9575b600080fd5b61006461005f366004610457565b6100c9565b005b600054610079906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100646100a43660046104cf565b610136565b6100bc6100b73660046104f8565b610259565b60405161008d9190610559565b6000546001600160a01b031633146101285760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064015b60405180910390fd5b610132828261026a565b5050565b6000546001600160a01b031633146101905760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e6572000000000000000000604482015260640161011f565b6001600160a01b0381166101e65760405162461bcd60e51b815260206004820152601d60248201527f4e6577206f776e657220697320746865207a65726f2061646472657373000000604482015260640161011f565b600080546040516001600160a01b03808516939216917fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c91a3600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6060610264826102f4565b92915050565b6000546001600160a01b031633146102c45760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e6572000000000000000000604482015260640161011f565b806001836040516102d5919061058c565b908152602001604051809103902090816102ef9190610630565b505050565b6060600182604051610306919061058c565b9081526020016040518091039020805461031f906105a8565b80601f016020809104026020016040519081016040528092919081815260200182805461034b906105a8565b80156103985780601f1061036d57610100808354040283529160200191610398565b820191906000526020600020905b81548152906001019060200180831161037b57829003601f168201915b50505050509050919050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156103d5576103d56103a4565b604051601f8501601f19908116603f011681019082821181831017156103fd576103fd6103a4565b8160405280935085815286868601111561041657600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011261044157600080fd5b610450838335602085016103ba565b9392505050565b6000806040838503121561046a57600080fd5b823567ffffffffffffffff8082111561048257600080fd5b61048e86838701610430565b935060208501359150808211156104a457600080fd5b508301601f810185136104b657600080fd5b6104c5858235602084016103ba565b9150509250929050565b6000602082840312156104e157600080fd5b81356001600160a01b038116811461045057600080fd5b60006020828403121561050a57600080fd5b813567ffffffffffffffff81111561052157600080fd5b61052d84828501610430565b949350505050565b60005b83811015610550578181015183820152602001610538565b50506000910152565b6020815260008251806020840152610578816040850160208701610535565b601f01601f19169190910160400192915050565b6000825161059e818460208701610535565b9190910192915050565b600181811c908216806105bc57607f821691505b6020821081036105dc57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156102ef57600081815260208120601f850160051c810160208610156106095750805b601f850160051c820191505b8181101561062857828155600101610615565b505050505050565b815167ffffffffffffffff81111561064a5761064a6103a4565b61065e8161065884546105a8565b846105e2565b602080601f831160018114610693576000841561067b5750858301515b600019600386901b1c1916600185901b178555610628565b600085815260208120601f198616915b828110156106c2578886015182559484019460019091019084016106a3565b50858210156106e05787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220f9b63480787b7346ac24c43a940fb57b32661df2e52ad904ededd25e03657eaf64736f6c63430008140033";

type YStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YStorage__factory extends ContractFactory {
  constructor(...args: YStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YStorage> {
    return super.deploy(overrides || {}) as Promise<YStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): YStorage {
    return super.attach(address) as YStorage;
  }
  override connect(signer: Signer): YStorage__factory {
    return super.connect(signer) as YStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YStorageInterface {
    return new utils.Interface(_abi) as YStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YStorage {
    return new Contract(address, _abi, signerOrProvider) as YStorage;
  }
}
