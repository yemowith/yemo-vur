/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  DSAthEvnts,
  DSAthEvntsInterface,
} from "../../../../YemoVur/Ykit/DDSP.sol/DSAthEvnts";

const _abi = [
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
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea26469706673582212208341d748051d767e456e92600050c77f10a448573cd8ca475e28f6c5ce02579464736f6c63430008140033";

type DSAthEvntsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DSAthEvntsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DSAthEvnts__factory extends ContractFactory {
  constructor(...args: DSAthEvntsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DSAthEvnts> {
    return super.deploy(overrides || {}) as Promise<DSAthEvnts>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DSAthEvnts {
    return super.attach(address) as DSAthEvnts;
  }
  override connect(signer: Signer): DSAthEvnts__factory {
    return super.connect(signer) as DSAthEvnts__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DSAthEvntsInterface {
    return new utils.Interface(_abi) as DSAthEvntsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DSAthEvnts {
    return new Contract(address, _abi, signerOrProvider) as DSAthEvnts;
  }
}