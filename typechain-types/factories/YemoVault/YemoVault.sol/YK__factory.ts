/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { YK, YKInterface } from "../../../YemoVault/YemoVault.sol/YK";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_dplr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ddsp",
        type: "address",
      },
      {
        internalType: "address",
        name: "_eemt",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ddsp",
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
    name: "dplr",
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
    name: "eemt",
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
  "0x608060405234801561001057600080fd5b506040516101db3803806101db83398101604081905261002f9161008d565b600080546001600160a01b039485166001600160a01b0319918216179091556001805493851693821693909317909255600280549190931691161790556100d0565b80516001600160a01b038116811461008857600080fd5b919050565b6000806000606084860312156100a257600080fd5b6100ab84610071565b92506100b960208501610071565b91506100c760408501610071565b90509250925092565b60fd806100de6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80638c5df0b2146041578063bd25d595146089578063e059f3481460a8575b600080fd5b60015460609073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b60025460609073ffffffffffffffffffffffffffffffffffffffff1681565b60005460609073ffffffffffffffffffffffffffffffffffffffff168156fea264697066735822122059c9b69b87cd5da92c4f3c7a3545ae7d5c6665c0a1f04afd53cdebca31b6a7ad64736f6c63430008140033";

type YKConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YKConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YK__factory extends ContractFactory {
  constructor(...args: YKConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _dplr: PromiseOrValue<string>,
    _ddsp: PromiseOrValue<string>,
    _eemt: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YK> {
    return super.deploy(_dplr, _ddsp, _eemt, overrides || {}) as Promise<YK>;
  }
  override getDeployTransaction(
    _dplr: PromiseOrValue<string>,
    _ddsp: PromiseOrValue<string>,
    _eemt: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_dplr, _ddsp, _eemt, overrides || {});
  }
  override attach(address: string): YK {
    return super.attach(address) as YK;
  }
  override connect(signer: Signer): YK__factory {
    return super.connect(signer) as YK__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YKInterface {
    return new utils.Interface(_abi) as YKInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): YK {
    return new Contract(address, _abi, signerOrProvider) as YK;
  }
}
