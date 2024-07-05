/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  YDeployer,
  YDeployerInterface,
} from "../../../../../contracts/Space/YTools/YDeployer.sol/YDeployer";

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
        internalType: "uint256",
        name: "_s",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_b",
        type: "bytes",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "proxyName",
        type: "string",
      },
    ],
    name: "deployProxy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_salt",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
    ],
    name: "getAddress",
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
    name: "getLastDeployed",
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
    name: "getLastDeployedProxy",
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
    name: "lastDeployedProxy",
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
    name: "lastDeployedProxyPy",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b0319338181169190921617179055610c09806100396000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c80638da5cb5b11610076578063b984cf831161005b578063b984cf831461019c578063d31fcac5146101a4578063e90e36e0146101b757600080fd5b80638da5cb5b14610174578063a6f9dae11461018757600080fd5b80631e41f17a146100a857806327e6daba146100cc578063476e106e1461014e57806361ff715f14610161575b600080fd5b6100b06101ca565b6040516001600160a01b03909116815260200160405180910390f35b6100b06100da366004610651565b8051602091820120604080517fff00000000000000000000000000000000000000000000000000000000000000818501523060601b6bffffffffffffffffffffffff191660218201526035810194909452605580850192909252805180850390920182526075909301909252815191012090565b6001546100b0906001600160a01b031681565b6100b061016f366004610651565b61023a565b6000546100b0906001600160a01b031681565b61019a6101953660046106c8565b6102a6565b005b6100b06103be565b6002546100b0906001600160a01b031681565b6100b06101c53660046106e3565b610429565b600080546001600160a01b0316331461022a5760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064015b60405180910390fd5b506001546001600160a01b031690565b600080546001600160a01b031633146102955760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e65720000000000000000006044820152606401610221565b61029f8383610557565b9392505050565b6000546001600160a01b031633146103005760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e65720000000000000000006044820152606401610221565b6001600160a01b0381166103565760405162461bcd60e51b815260206004820152601d60248201527f4e6577206f776e657220697320746865207a65726f20616464726573730000006044820152606401610221565b600080546040516001600160a01b03808516939216917fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c91a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b600080546001600160a01b031633146104195760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e65720000000000000000006044820152606401610221565b506002546001600160a01b031690565b600080546001600160a01b031633146104845760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e65720000000000000000006044820152606401610221565b600082604051602001610497919061073f565b6040516020818303038152906040528051906020012060001c90506000604051806020016104c49061059f565b601f1982820381018352601f9091011660408181526001600160a01b03881660208301520160408051601f1981840301815290829052610507929160200161075b565b60405160208183030381529060405290506105228282610557565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216918217905595945050505050565b6000808383516020850134f59050803b61057057600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383161790559392505050565b6104498061078b83390190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff808411156105f6576105f66105ac565b604051601f8501601f19908116603f0116810190828211818310171561061e5761061e6105ac565b8160405280935085815286868601111561063757600080fd5b858560208301376000602087830101525050509392505050565b6000806040838503121561066457600080fd5b82359150602083013567ffffffffffffffff81111561068257600080fd5b8301601f8101851361069357600080fd5b6106a2858235602084016105db565b9150509250929050565b80356001600160a01b03811681146106c357600080fd5b919050565b6000602082840312156106da57600080fd5b61029f826106ac565b600080604083850312156106f657600080fd5b6106ff836106ac565b9150602083013567ffffffffffffffff81111561068257600080fd5b60005b8381101561073657818101518382015260200161071e565b50506000910152565b6000825161075181846020870161071b565b9190910192915050565b6000835161076d81846020880161071b565b83519083019061078181836020880161071b565b0194935050505056fe608060405234801561001057600080fd5b5060405161044938038061044983398101604081905261002f9161005b565b600080546001600160a01b031990811633909116176001600160a01b039290921691909117905561008b565b60006020828403121561006d57600080fd5b81516001600160a01b038116811461008457600080fd5b9392505050565b6103af8061009a6000396000f3fe6080604052600436106100435760003560e01c80635c60da1b1461010c5780638da5cb5b14610148578063a6f9dae114610168578063d784d4261461018857610088565b3661008857604080516020808252600090820152339134917f606834f57405380c4fb88d1f4850326ad3885f014bab3b568dfbf7a041eef738910160405180910390a3005b6001546001600160a01b0316806100e65760405162461bcd60e51b815260206004820152601960248201527f496d706c656d656e746174696f6e206e6f74207365747465640000000000000060448201526064015b60405180910390fd5b3660008037600080366000845af43d6000803e808015610105573d6000f35b3d6000fd5b005b34801561011857600080fd5b5060015461012c906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b34801561015457600080fd5b5060005461012c906001600160a01b031681565b34801561017457600080fd5b5061010a610183366004610349565b6101a8565b34801561019457600080fd5b5061010a6101a3366004610349565b6102c0565b6000546001600160a01b031633146102025760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064016100dd565b6001600160a01b0381166102585760405162461bcd60e51b815260206004820152601d60248201527f4e6577206f776e657220697320746865207a65726f206164647265737300000060448201526064016100dd565b600080546040516001600160a01b03808516939216917fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c91a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6000546001600160a01b0316331461031a5760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064016100dd565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b60006020828403121561035b57600080fd5b81356001600160a01b038116811461037257600080fd5b939250505056fea26469706673582212204771f6432f20fe8466bbfea38e43c24aa339366cbf2e98484d3a166ca022134a64736f6c63430008140033a2646970667358221220f1738e595c7208d0ce99c68e9e1646f6b9e2df0773e6bf9b3aef53044984bc1964736f6c63430008140033";

type YDeployerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YDeployerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YDeployer__factory extends ContractFactory {
  constructor(...args: YDeployerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YDeployer> {
    return super.deploy(overrides || {}) as Promise<YDeployer>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): YDeployer {
    return super.attach(address) as YDeployer;
  }
  override connect(signer: Signer): YDeployer__factory {
    return super.connect(signer) as YDeployer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YDeployerInterface {
    return new utils.Interface(_abi) as YDeployerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YDeployer {
    return new Contract(address, _abi, signerOrProvider) as YDeployer;
  }
}
