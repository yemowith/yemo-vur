/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ERC20Locker,
  ERC20LockerInterface,
} from "../../../../contracts/Ykit/Locker/ERC20Locker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EmergencyUnlock",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockTime",
        type: "uint256",
      },
    ],
    name: "Locked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unlocked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "emergencyUnlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "additionalTime",
        type: "uint256",
      },
    ],
    name: "extendLock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getLockInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "unlockTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lockTime",
        type: "uint256",
      },
    ],
    name: "lockTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "locks",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "unlockTime",
        type: "uint256",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
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
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unlockTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c3e380380610c3e83398101604081905261002f9161012b565b338061005657604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61005f816100db565b506001600160a01b0381166100b65760405162461bcd60e51b815260206004820152601560248201527f496e76616c696420746f6b656e20616464726573730000000000000000000000604482015260640161004d565b600180546001600160a01b0319166001600160a01b039290921691909117905561015b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561013d57600080fd5b81516001600160a01b038116811461015457600080fd5b9392505050565b610ad48061016a6000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c806389158d8e11610076578063f2fde38b1161005b578063f2fde38b1461019d578063f968f493146101b0578063fc0c546a146101b857600080fd5b806389158d8e146101655780638da5cb5b1461017857600080fd5b8063715018a6116100a7578063715018a6146101195780637238ccdb146101215780637ff9bca11461015257600080fd5b806344ee3a1c146100c35780635de9a137146100d8575b600080fd5b6100d66100d13660046109d1565b6101cb565b005b6100ff6100e63660046109ea565b6002602052600090815260409020805460019091015482565b604080519283526020830191909152015b60405180910390f35b6100d6610316565b6100ff61012f3660046109ea565b6001600160a01b0316600090815260026020526040902080546001909101549091565b6100d66101603660046109ea565b61032a565b6100d6610173366004610a1a565b6104b4565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610110565b6100d66101ab3660046109ea565b610709565b6100d6610760565b600154610185906001600160a01b031681565b3360008181526002602052604090205461021f5760405162461bcd60e51b815260206004820152601060248201526f139bc81d1bdad95b9cc81b1bd8dad95960821b60448201526064015b60405180910390fd5b600082116102955760405162461bcd60e51b815260206004820152602660248201527f4164646974696f6e616c2074696d65206d75737420626520677265617465722060448201527f7468616e203000000000000000000000000000000000000000000000000000006064820152608401610216565b33600090815260026020526040812060010180548492906102b7908490610a3c565b90915550503360008181526002602052604090819020805460019091015491517fd4665e3049283582ba6f9eba07a5b3e12dab49e02da99e8927a47af5d134bea59261030a928252602082015260400190565b60405180910390a25050565b61031e610923565b6103286000610969565b565b610332610923565b6001600160a01b038116600090815260026020526040902054819061038c5760405162461bcd60e51b815260206004820152601060248201526f139bc81d1bdad95b9cc81b1bd8dad95960821b6044820152606401610216565b6001600160a01b03828116600081815260026020526040808220805483825560019182019390935554905163a9059cbb60e01b81526004810193909352602483018290529092169063a9059cbb906044016020604051808303816000875af11580156103fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104209190610a7c565b61046c5760405162461bcd60e51b815260206004820152601560248201527f546f6b656e207472616e73666572206661696c656400000000000000000000006044820152606401610216565b826001600160a01b03167fb8797ab767ff1517f7c915ddd7c9a79ae5609fc876c2d87f2b2b545475642a1a826040516104a791815260200190565b60405180910390a2505050565b33600081815260026020526040902054156105115760405162461bcd60e51b815260206004820152601560248201527f546f6b656e7320616c7265616479206c6f636b656400000000000000000000006044820152606401610216565b600083116105615760405162461bcd60e51b815260206004820152601d60248201527f416d6f756e74206d7573742062652067726561746572207468616e20300000006044820152606401610216565b600082116105b15760405162461bcd60e51b815260206004820181905260248201527f4c6f636b2074696d65206d7573742062652067726561746572207468616e20306044820152606401610216565b6001546040517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018590526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610621573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106459190610a7c565b6106915760405162461bcd60e51b815260206004820152601560248201527f546f6b656e207472616e73666572206661696c656400000000000000000000006044820152606401610216565b604051806040016040528084815260200183426106ae9190610a3c565b9052336000818152600260209081526040918290208451815593015160019093018390555190917fd4665e3049283582ba6f9eba07a5b3e12dab49e02da99e8927a47af5d134bea5916104a791878252602082015260400190565b610711610923565b6001600160a01b038116610754576040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260006004820152602401610216565b61075d81610969565b50565b336000818152600260205260409020546107af5760405162461bcd60e51b815260206004820152601060248201526f139bc81d1bdad95b9cc81b1bd8dad95960821b6044820152606401610216565b336000908152600260205260409020600101544210156108115760405162461bcd60e51b815260206004820152601b60248201527f4c6f636b20706572696f64206e6f7420796574206578706972656400000000006044820152606401610216565b33600081815260026020526040808220805483825560019182019390935554905163a9059cbb60e01b815260048101939093526024830182905290916001600160a01b039091169063a9059cbb906044016020604051808303816000875af1158015610881573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a59190610a7c565b6108f15760405162461bcd60e51b815260206004820152601560248201527f546f6b656e207472616e73666572206661696c656400000000000000000000006044820152606401610216565b60405181815233907f0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d9060200161030a565b6000546001600160a01b03163314610328576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610216565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156109e357600080fd5b5035919050565b6000602082840312156109fc57600080fd5b81356001600160a01b0381168114610a1357600080fd5b9392505050565b60008060408385031215610a2d57600080fd5b50508035926020909101359150565b80820180821115610a76577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b600060208284031215610a8e57600080fd5b81518015158114610a1357600080fdfea2646970667358221220b028379f8beb71cc9b875f2679b531165e53cda284ea54d59b22e955f2d9883a64736f6c63430008140033";

type ERC20LockerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20LockerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Locker__factory extends ContractFactory {
  constructor(...args: ERC20LockerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC20Locker> {
    return super.deploy(_token, overrides || {}) as Promise<ERC20Locker>;
  }
  override getDeployTransaction(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, overrides || {});
  }
  override attach(address: string): ERC20Locker {
    return super.attach(address) as ERC20Locker;
  }
  override connect(signer: Signer): ERC20Locker__factory {
    return super.connect(signer) as ERC20Locker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20LockerInterface {
    return new utils.Interface(_abi) as ERC20LockerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20Locker {
    return new Contract(address, _abi, signerOrProvider) as ERC20Locker;
  }
}
