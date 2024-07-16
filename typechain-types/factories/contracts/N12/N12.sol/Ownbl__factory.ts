/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  Ownbl,
  OwnblInterface,
} from "../../../../contracts/N12/N12.sol/Ownbl";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ownr",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnrship",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b031916331790556101bd806100326000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80631b8cf2a31461003b5780637b8cb8b71461006a575b600080fd5b60005461004e906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61007d610078366004610157565b61007f565b005b6000546001600160a01b0316331461011d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60448201527f6e00000000000000000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b60006020828403121561016957600080fd5b81356001600160a01b038116811461018057600080fd5b939250505056fea2646970667358221220f0a3af29be062b6bb40e8017d145cb1fd61d177f8a05a29ea8f80e1854cc252d64736f6c63430008140033";

type OwnblConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwnblConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Ownbl__factory extends ContractFactory {
  constructor(...args: OwnblConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Ownbl> {
    return super.deploy(overrides || {}) as Promise<Ownbl>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Ownbl {
    return super.attach(address) as Ownbl;
  }
  override connect(signer: Signer): Ownbl__factory {
    return super.connect(signer) as Ownbl__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwnblInterface {
    return new utils.Interface(_abi) as OwnblInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Ownbl {
    return new Contract(address, _abi, signerOrProvider) as Ownbl;
  }
}