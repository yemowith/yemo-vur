/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  AdvancedERC20Locker,
  AdvancedERC20LockerInterface,
} from "../../../../contracts/Ykit/Locker/AdvancedERC20Locker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_penaltyFee",
        type: "uint256",
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
      {
        indexed: false,
        internalType: "uint256",
        name: "penalty",
        type: "uint256",
      },
    ],
    name: "EmergencyUnlocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newRecipient",
        type: "address",
      },
    ],
    name: "FeeRecipientChanged",
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
        indexed: false,
        internalType: "uint256",
        name: "newPenaltyFee",
        type: "uint256",
      },
    ],
    name: "PenaltyFeeChanged",
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
    name: "autoUnlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "lockTime",
        type: "uint256",
      },
    ],
    name: "batchLockTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
    ],
    name: "batchUnlockTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newRecipient",
        type: "address",
      },
    ],
    name: "changeFeeRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newPenaltyFee",
        type: "uint256",
      },
    ],
    name: "changePenaltyFee",
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
    inputs: [],
    name: "feeRecipient",
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
    name: "penaltyFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
  "0x60806040523480156200001157600080fd5b50604051620018f2380380620018f283398101604081905262000034916200021f565b33806200005c57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b6200006781620001b2565b506001600160a01b038316620000c05760405162461bcd60e51b815260206004820152601560248201527f496e76616c696420746f6b656e20616464726573730000000000000000000000604482015260640162000053565b6001600160a01b038216620001185760405162461bcd60e51b815260206004820152601d60248201527f496e76616c69642066656520726563697069656e742061646472657373000000604482015260640162000053565b6064811115620001795760405162461bcd60e51b815260206004820152602560248201527f50656e616c747920666565206d757374206265206265747765656e203020616e604482015264064203130360dc1b606482015260840162000053565b600180546001600160a01b039485166001600160a01b031991821617909155600380549390941692169190911790915560045562000260565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200021a57600080fd5b919050565b6000806000606084860312156200023557600080fd5b620002408462000202565b9250620002506020850162000202565b9150604084015190509250925092565b61168280620002706000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c80637adc179a116100b25780638da5cb5b11610081578063f2fde38b11610066578063f2fde38b14610287578063f968f4931461029a578063fc0c546a146102a257600080fd5b80638da5cb5b14610263578063e20bc67b1461027457600080fd5b80637adc179a146102175780637ff9bca11461022a57806389158d8e1461023d5780638c63f97f1461025057600080fd5b806346904840116100ee57806346904840146101775780635de9a137146101a2578063715018a6146101de5780637238ccdb146101e657600080fd5b80631db385781461012057806323604071146101355780633dc10ad41461014857806344ee3a1c14610164575b600080fd5b61013361012e36600461145f565b6102b5565b005b6101336101433660046114d3565b61058f565b61015160045481565b6040519081526020015b60405180910390f35b610133610172366004611503565b610644565b60035461018a906001600160a01b031681565b6040516001600160a01b03909116815260200161015b565b6101c96101b03660046114d3565b6002602052600090815260409020805460019091015482565b6040805192835260208301919091520161015b565b61013361078a565b6101c96101f43660046114d3565b6001600160a01b0316600090815260026020526040902080546001909101549091565b61013361022536600461151c565b61079e565b6101336102383660046114d3565b6109e2565b61013361024b36600461155e565b610c71565b61013361025e366004611503565b610eb2565b6000546001600160a01b031661018a565b6101336102823660046114d3565b610f6c565b6101336102953660046114d3565b610fe3565b610133611037565b60015461018a906001600160a01b031681565b6102bd6111f2565b8382146103375760405162461bcd60e51b815260206004820152602160248201527f557365727320616e6420616d6f756e7473206c656e677468206d69736d61746360448201527f680000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b600081116103875760405162461bcd60e51b815260206004820181905260248201527f4c6f636b2074696d65206d7573742062652067726561746572207468616e2030604482015260640161032e565b60005b848110156105875760008686838181106103a6576103a6611580565b90506020020160208101906103bb91906114d3565b905060008585848181106103d1576103d1611580565b9050602002013590506000811161042a5760405162461bcd60e51b815260206004820152601d60248201527f416d6f756e74206d7573742062652067726561746572207468616e2030000000604482015260640161032e565b6001546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610481573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a59190611596565b6104e95760405162461bcd60e51b8152602060048201526015602482015274151bdad95b881d1c985b9cd9995c8819985a5b1959605a1b604482015260640161032e565b6040518060400160405280828152602001854261050691906115ce565b90526001600160a01b0383166000818152600260209081526040918290208451815593015160019093018390555190917fd4665e3049283582ba6f9eba07a5b3e12dab49e02da99e8927a47af5d134bea59161056a91858252602082015260400190565b60405180910390a25050808061057f906115e7565b91505061038a565b505050505050565b6105976111f2565b6001600160a01b0381166105ed5760405162461bcd60e51b815260206004820152601d60248201527f496e76616c69642066656520726563697069656e742061646472657373000000604482015260640161032e565b6003805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383169081179091556040517f167cccccc6e9b2892a740ec13fc1e51d3de8ea384f25bd87fee7412d588637e290600090a250565b336000818152600260205260409020546106935760405162461bcd60e51b815260206004820152601060248201526f139bc81d1bdad95b9cc81b1bd8dad95960821b604482015260640161032e565b600082116107095760405162461bcd60e51b815260206004820152602660248201527f4164646974696f6e616c2074696d65206d75737420626520677265617465722060448201527f7468616e20300000000000000000000000000000000000000000000000000000606482015260840161032e565b336000908152600260205260408120600101805484929061072b9084906115ce565b90915550503360008181526002602052604090819020805460019091015491517fd4665e3049283582ba6f9eba07a5b3e12dab49e02da99e8927a47af5d134bea59261077e928252602082015260400190565b60405180910390a25050565b6107926111f2565b61079c6000611238565b565b6107a66111f2565b60005b818110156109dd5760008383838181106107c5576107c5611580565b90506020020160208101906107da91906114d3565b6001600160a01b0381166000908152600260205260409020549091506108425760405162461bcd60e51b815260206004820152601960248201527f4e6f20746f6b656e73206c6f636b656420666f72207573657200000000000000604482015260640161032e565b6001600160a01b0381166000908152600260205260409020600101544210156108ad5760405162461bcd60e51b815260206004820152601b60248201527f4c6f636b20706572696f64206e6f742079657420657870697265640000000000604482015260640161032e565b6001600160a01b03818116600081815260026020526040808220805483825560019182019390935554905163a9059cbb60e01b81526004810193909352602483018290529092169063a9059cbb906044016020604051808303816000875af115801561091d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109419190611596565b6109855760405162461bcd60e51b8152602060048201526015602482015274151bdad95b881d1c985b9cd9995c8819985a5b1959605a1b604482015260640161032e565b816001600160a01b03167f0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d826040516109c091815260200190565b60405180910390a2505080806109d5906115e7565b9150506107a9565b505050565b6109ea6111f2565b6001600160a01b0381166000908152600260205260409020548190610a445760405162461bcd60e51b815260206004820152601060248201526f139bc81d1bdad95b9cc81b1bd8dad95960821b604482015260640161032e565b6001600160a01b038216600090815260026020526040812054600454909190606490610a709084611600565b610a7a9190611617565b90506000610a888284611639565b6001600160a01b038681166000818152600260205260408082208281556001908101929092559054905163a9059cbb60e01b815260048101929092526024820184905292935091169063a9059cbb906044016020604051808303816000875af1158015610af9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1d9190611596565b610b615760405162461bcd60e51b8152602060048201526015602482015274151bdad95b881d1c985b9cd9995c8819985a5b1959605a1b604482015260640161032e565b60015460035460405163a9059cbb60e01b81526001600160a01b0391821660048201526024810185905291169063a9059cbb906044016020604051808303816000875af1158015610bb6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bda9190611596565b610c265760405162461bcd60e51b815260206004820152601760248201527f50656e616c7479207472616e73666572206661696c6564000000000000000000604482015260640161032e565b60408051828152602081018490526001600160a01b038716917f73f0644cd8afa7ad22314a5cead22c249f333e40fa1fe21a6b282ae3f5fd5df4910160405180910390a25050505050565b3360008181526002602052604090205415610cce5760405162461bcd60e51b815260206004820152601560248201527f546f6b656e7320616c7265616479206c6f636b65640000000000000000000000604482015260640161032e565b60008311610d1e5760405162461bcd60e51b815260206004820152601d60248201527f416d6f756e74206d7573742062652067726561746572207468616e2030000000604482015260640161032e565b60008211610d6e5760405162461bcd60e51b815260206004820181905260248201527f4c6f636b2074696d65206d7573742062652067726561746572207468616e2030604482015260640161032e565b6001546040516323b872dd60e01b8152336004820152306024820152604481018590526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610dc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de99190611596565b610e2d5760405162461bcd60e51b8152602060048201526015602482015274151bdad95b881d1c985b9cd9995c8819985a5b1959605a1b604482015260640161032e565b60405180604001604052808481526020018342610e4a91906115ce565b9052336000818152600260209081526040918290208451815593015160019093018390555190917fd4665e3049283582ba6f9eba07a5b3e12dab49e02da99e8927a47af5d134bea591610ea591878252602082015260400190565b60405180910390a2505050565b610eba6111f2565b6064811115610f315760405162461bcd60e51b815260206004820152602560248201527f50656e616c747920666565206d757374206265206265747765656e203020616e60448201527f6420313030000000000000000000000000000000000000000000000000000000606482015260840161032e565b60048190556040518181527fa7cc64a490a22923f235b5cd25427bb587bd88201beaec55f53607de26cf3d279060200160405180910390a150565b6001600160a01b038116600090815260026020526040902060010154421015610fd75760405162461bcd60e51b815260206004820152601b60248201527f4c6f636b20706572696f64206e6f742079657420657870697265640000000000604482015260640161032e565b610fe081611295565b50565b610feb6111f2565b6001600160a01b03811661102e576040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526000600482015260240161032e565b610fe081611238565b336000818152600260205260409020546110865760405162461bcd60e51b815260206004820152601060248201526f139bc81d1bdad95b9cc81b1bd8dad95960821b604482015260640161032e565b336000908152600260205260409020600101544210156110e85760405162461bcd60e51b815260206004820152601b60248201527f4c6f636b20706572696f64206e6f742079657420657870697265640000000000604482015260640161032e565b33600081815260026020526040808220805483825560019182019390935554905163a9059cbb60e01b815260048101939093526024830182905290916001600160a01b039091169063a9059cbb906044016020604051808303816000875af1158015611158573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061117c9190611596565b6111c05760405162461bcd60e51b8152602060048201526015602482015274151bdad95b881d1c985b9cd9995c8819985a5b1959605a1b604482015260640161032e565b60405181815233907f0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d9060200161077e565b6000546001600160a01b0316331461079c576040517f118cdaa700000000000000000000000000000000000000000000000000000000815233600482015260240161032e565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381166000908152600260205260409020600101544210156113005760405162461bcd60e51b815260206004820152601b60248201527f4c6f636b20706572696f64206e6f742079657420657870697265640000000000604482015260640161032e565b6001600160a01b03818116600081815260026020526040808220805483825560019182019390935554905163a9059cbb60e01b81526004810193909352602483018290529092169063a9059cbb906044016020604051808303816000875af1158015611370573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113949190611596565b6113d85760405162461bcd60e51b8152602060048201526015602482015274151bdad95b881d1c985b9cd9995c8819985a5b1959605a1b604482015260640161032e565b816001600160a01b03167f0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d8260405161077e91815260200190565b60008083601f84011261142557600080fd5b50813567ffffffffffffffff81111561143d57600080fd5b6020830191508360208260051b850101111561145857600080fd5b9250929050565b60008060008060006060868803121561147757600080fd5b853567ffffffffffffffff8082111561148f57600080fd5b61149b89838a01611413565b909750955060208801359150808211156114b457600080fd5b506114c188828901611413565b96999598509660400135949350505050565b6000602082840312156114e557600080fd5b81356001600160a01b03811681146114fc57600080fd5b9392505050565b60006020828403121561151557600080fd5b5035919050565b6000806020838503121561152f57600080fd5b823567ffffffffffffffff81111561154657600080fd5b61155285828601611413565b90969095509350505050565b6000806040838503121561157157600080fd5b50508035926020909101359150565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156115a857600080fd5b815180151581146114fc57600080fd5b634e487b7160e01b600052601160045260246000fd5b808201808211156115e1576115e16115b8565b92915050565b6000600182016115f9576115f96115b8565b5060010190565b80820281158282048414176115e1576115e16115b8565b60008261163457634e487b7160e01b600052601260045260246000fd5b500490565b818103818111156115e1576115e16115b856fea26469706673582212207aaeb0deff2019181dd74c782da7bcc54e30d3aa9870d3e6226c4f7c0c4eb72564736f6c63430008140033";

type AdvancedERC20LockerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AdvancedERC20LockerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AdvancedERC20Locker__factory extends ContractFactory {
  constructor(...args: AdvancedERC20LockerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _token: PromiseOrValue<string>,
    _feeRecipient: PromiseOrValue<string>,
    _penaltyFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AdvancedERC20Locker> {
    return super.deploy(
      _token,
      _feeRecipient,
      _penaltyFee,
      overrides || {}
    ) as Promise<AdvancedERC20Locker>;
  }
  override getDeployTransaction(
    _token: PromiseOrValue<string>,
    _feeRecipient: PromiseOrValue<string>,
    _penaltyFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _token,
      _feeRecipient,
      _penaltyFee,
      overrides || {}
    );
  }
  override attach(address: string): AdvancedERC20Locker {
    return super.attach(address) as AdvancedERC20Locker;
  }
  override connect(signer: Signer): AdvancedERC20Locker__factory {
    return super.connect(signer) as AdvancedERC20Locker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdvancedERC20LockerInterface {
    return new utils.Interface(_abi) as AdvancedERC20LockerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AdvancedERC20Locker {
    return new Contract(address, _abi, signerOrProvider) as AdvancedERC20Locker;
  }
}