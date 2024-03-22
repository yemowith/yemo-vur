/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  DDSPCache,
  DDSPCacheInterface,
} from "../../../../../contracts/YemoKit/Helpers/DDSP.sol/DDSPCache";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_code",
        type: "bytes",
      },
    ],
    name: "read",
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
        internalType: "bytes",
        name: "_code",
        type: "bytes",
      },
    ],
    name: "write",
    outputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061023f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80637ed0c3b21461003b5780638bf4515c14610077575b600080fd5b61004e610049366004610158565b6100b4565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61004e610085366004610158565b8051602091820120600090815290819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60008151602083016000f09050803b15600181036100d157600080fd5b508151602092830120600090815291829052604090912080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff831617905590565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561016a57600080fd5b813567ffffffffffffffff8082111561018257600080fd5b818401915084601f83011261019657600080fd5b8135818111156101a8576101a8610129565b604051601f8201601f19908116603f011681019083821181831017156101d0576101d0610129565b816040528281528760208487010111156101e957600080fd5b82602086016020830137600092810160200192909252509594505050505056fea26469706673582212205857cfc28aa97ec783fdbce0ba539b916150e924c45ef0b6e59222ee1b78792f64736f6c63430008140033";

type DDSPCacheConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DDSPCacheConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DDSPCache__factory extends ContractFactory {
  constructor(...args: DDSPCacheConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DDSPCache> {
    return super.deploy(overrides || {}) as Promise<DDSPCache>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DDSPCache {
    return super.attach(address) as DDSPCache;
  }
  override connect(signer: Signer): DDSPCache__factory {
    return super.connect(signer) as DDSPCache__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DDSPCacheInterface {
    return new utils.Interface(_abi) as DDSPCacheInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DDSPCache {
    return new Contract(address, _abi, signerOrProvider) as DDSPCache;
  }
}