/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DeployYKitBase,
  DeployYKitBaseInterface,
} from "../../../contracts/scripts/DeployYKitBase";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220a5e7c624f5125fd2358f57c34418cf64999925d38918f71135bb15960614223d64736f6c63430008140033";

type DeployYKitBaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DeployYKitBaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DeployYKitBase__factory extends ContractFactory {
  constructor(...args: DeployYKitBaseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DeployYKitBase> {
    return super.deploy(overrides || {}) as Promise<DeployYKitBase>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DeployYKitBase {
    return super.attach(address) as DeployYKitBase;
  }
  override connect(signer: Signer): DeployYKitBase__factory {
    return super.connect(signer) as DeployYKitBase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeployYKitBaseInterface {
    return new utils.Interface(_abi) as DeployYKitBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeployYKitBase {
    return new Contract(address, _abi, signerOrProvider) as DeployYKitBase;
  }
}
