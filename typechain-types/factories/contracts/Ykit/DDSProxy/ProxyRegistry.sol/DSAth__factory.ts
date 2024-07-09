/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  DSAth,
  DSAthInterface,
} from "../../../../../contracts/Ykit/DDSProxy/ProxyRegistry.sol/DSAth";

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
        name: "authority",
        type: "address",
      },
    ],
    name: "LogSetAuthority",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "LogSetOwner",
    type: "event",
  },
  {
    inputs: [],
    name: "authority",
    outputs: [
      {
        internalType: "contract DSAthrt",
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
        internalType: "contract DSAthrt",
        name: "authority_",
        type: "address",
      },
    ],
    name: "setAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600180546001600160a01b031916339081179091556040517fce241d7ca1f669fee44b6fc00b8eba2df3bb514eed0f6f668f8f89096e81ed9490600090a26104028061005e6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806313af4035146100515780637a9e5e4b146100665780638da5cb5b14610079578063bf7e214f146100a8575b600080fd5b61006461005f366004610386565b6100bb565b005b610064610074366004610386565b610191565b60015461008c906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b60005461008c906001600160a01b031681565b6100e9336000357fffffffff0000000000000000000000000000000000000000000000000000000016610260565b61013a5760405162461bcd60e51b815260206004820152601460248201527f64732d617574682d756e617574686f72697a656400000000000000000000000060448201526064015b60405180910390fd5b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383169081179091556040517fce241d7ca1f669fee44b6fc00b8eba2df3bb514eed0f6f668f8f89096e81ed9490600090a250565b6101bf336000357fffffffff0000000000000000000000000000000000000000000000000000000016610260565b61020b5760405162461bcd60e51b815260206004820152601460248201527f64732d617574682d756e617574686f72697a65640000000000000000000000006044820152606401610131565b6000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038316908117825560405190917f1abebea81bfa2637f28358c371278fb15ede7ea8dd28d2e03b112ff6d936ada491a250565b6000306001600160a01b0384160361027a57506001610368565b6001546001600160a01b039081169084160361029857506001610368565b6000546001600160a01b03166102b057506000610368565b6000546040517fb70096130000000000000000000000000000000000000000000000000000000081526001600160a01b0385811660048301523060248301527fffffffff00000000000000000000000000000000000000000000000000000000851660448301529091169063b700961390606401602060405180830381865afa158015610341573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036591906103aa565b90505b92915050565b6001600160a01b038116811461038357600080fd5b50565b60006020828403121561039857600080fd5b81356103a38161036e565b9392505050565b6000602082840312156103bc57600080fd5b815180151581146103a357600080fdfea2646970667358221220ba122e41ad5070f048b09343739cb7150cb2e9346d2b304c673b8c9167e8928864736f6c63430008140033";

type DSAthConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DSAthConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DSAth__factory extends ContractFactory {
  constructor(...args: DSAthConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DSAth> {
    return super.deploy(overrides || {}) as Promise<DSAth>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DSAth {
    return super.attach(address) as DSAth;
  }
  override connect(signer: Signer): DSAth__factory {
    return super.connect(signer) as DSAth__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DSAthInterface {
    return new utils.Interface(_abi) as DSAthInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): DSAth {
    return new Contract(address, _abi, signerOrProvider) as DSAth;
  }
}
