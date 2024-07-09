/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  CustomPausable,
  CustomPausableInterface,
} from "../../../../../contracts/Ykit/Stake/StakingContract.sol/CustomPausable";

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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506000805433610100026001600160a81b0319909116179055610202806100386000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633f4ba83a146100465780635c975abb146100505780638456cb591461006a575b600080fd5b61004e610072565b005b60005460ff16604051901515815260200160405180910390f35b61004e610123565b600054610100900473ffffffffffffffffffffffffffffffffffffffff1633146100e35760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573657200000000000000000000000060448201526064015b60405180910390fd5b6000805460ff191690556040513381527f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa906020015b60405180910390a1565b600054610100900473ffffffffffffffffffffffffffffffffffffffff16331461018f5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573657200000000000000000000000060448201526064016100da565b6000805460ff191660011790556040513381527f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2589060200161011956fea26469706673582212209ae9cf3eb43e8e5a39d260e3a655b6de9aa90330f25243722332fa0f1f96fdb064736f6c63430008140033";

type CustomPausableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CustomPausableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CustomPausable__factory extends ContractFactory {
  constructor(...args: CustomPausableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CustomPausable> {
    return super.deploy(overrides || {}) as Promise<CustomPausable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CustomPausable {
    return super.attach(address) as CustomPausable;
  }
  override connect(signer: Signer): CustomPausable__factory {
    return super.connect(signer) as CustomPausable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CustomPausableInterface {
    return new utils.Interface(_abi) as CustomPausableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CustomPausable {
    return new Contract(address, _abi, signerOrProvider) as CustomPausable;
  }
}
