/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ETHLocker,
  ETHLockerInterface,
} from "../../../../../contracts/Ykit/Locker/ETHLocker.sol/ETHLocker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "depositId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "depositId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_depositId",
        type: "uint256",
      },
    ],
    name: "canWithdraw",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_lockForDays",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "_minExpectedPrice",
        type: "int256",
      },
    ],
    name: "configureDeposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_depositId",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "uint256",
        name: "lockForDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "minExpectedPrice",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getETHPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newLockForDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_depositId",
        type: "uint256",
      },
    ],
    name: "increaseLockForDays",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "_newMinExpectedPrice",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "_depositId",
        type: "uint256",
      },
    ],
    name: "increaseMinExpectedPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lockerPass",
    outputs: [
      {
        internalType: "contract LockerPass",
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
        internalType: "uint256",
        name: "_depositId",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516126c03803806126c083398101604081905261002f916100f8565b600080546001600160a01b0319166001600160a01b0383161790556040513090610058906100eb565b6001600160a01b039091168152606060208201819052600d908201526c4554484c6f636b65725061737360981b608082015260a0604082018190526003908201526204c4f560ec1b60c082015260e001604051809103906000f0801580156100c4573d6000803e3d6000fd5b50600280546001600160a01b0319166001600160a01b039290921691909117905550610128565b6115cc806110f483390190565b60006020828403121561010a57600080fd5b81516001600160a01b038116811461012157600080fd5b9392505050565b610fbd806101376000396000f3fe6080604052600436106100965760003560e01c8063a607a8d911610069578063b6b55f251161004e578063b6b55f25146101b3578063eca8de29146101c6578063fbe85f06146101e657600080fd5b8063a607a8d91461012d578063b02c43d01461015057600080fd5b8063229cf5a71461009b5780632e1a7d4d146100d857806378d8a3a9146100fa578063948c38d11461010d575b600080fd5b3480156100a757600080fd5b506002546100bb906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156100e457600080fd5b506100f86100f3366004610da8565b610216565b005b6100f8610108366004610dc1565b6104c5565b34801561011957600080fd5b506100f8610128366004610dc1565b6106a5565b34801561013957600080fd5b5061014261088d565b6040519081526020016100cf565b34801561015c57600080fd5b5061019361016b366004610da8565b6001602081905260009182526040909120805491810154600282015460039092015490919084565b6040805194855260208501939093529183015260608201526080016100cf565b6100f86101c1366004610da8565b610930565b3480156101d257600080fd5b506100f86101e1366004610dc1565b610ab5565b3480156101f257600080fd5b50610206610201366004610da8565b610c94565b60405190151581526020016100cf565b6002546040516331a9108f60e11b8152600481018390523391839183916001600160a01b031690636352211e90602401602060405180830381865afa158015610263573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102879190610de3565b6001600160a01b0316146102d25760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc819195b9a5959609a1b60448201526064015b60405180910390fd5b6001600082815260200190815260200160002060010154600014156040518060400160405280601781526020017f4465706f736974206e6f7420636f6e666967757265642e000000000000000000815250906103415760405162461bcd60e51b81526004016102c99190610e13565b5061034b83610c94565b6103975760405162461bcd60e51b815260206004820152601860248201527f596f752063616e6e6f742077697468647261772079657421000000000000000060448201526064016102c9565b60008381526001602081815260408084208151608081018352815481528185018054828601526002808401805484870152600385018054606086018190528d8b529890975293889055908790559186905594909255905490517f42966c68000000000000000000000000000000000000000000000000000000008152600481018790526001600160a01b03909116906342966c6890602401600060405180830381600087803b15801561044957600080fd5b505af115801561045d573d6000803e3d6000fd5b505060405133925083156108fc02915083906000818181858888f1935050505015801561048e573d6000803e3d6000fd5b506040518190869033907fdf273cb619d95419a9cd0ec88123a0538c85064229baa6363788f743fff90deb90600090a45050505050565b60008112156105165760405162461bcd60e51b815260206004820152601f60248201527f496e76616c6964206d696e457870656374656450726963652076616c75652e0060448201526064016102c9565b604080516080810182528381524260208083019190915281830184905234606083015260025483517f61b8ce8c000000000000000000000000000000000000000000000000000000008152935192936000936001600160a01b03909216926361b8ce8c926004808401938290030181865afa158015610599573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bd9190610e61565b6002546040517f6a6278420000000000000000000000000000000000000000000000000000000081523360048201529192506001600160a01b031690636a62784290602401600060405180830381600087803b15801561061c57600080fd5b505af1158015610630573d6000803e3d6000fd5b505050600082815260016020818152604092839020865181559086015191810191909155908401516002820155606084015160039091015550341561069f576040513490829033907f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a1590600090a45b50505050565b6002546040516331a9108f60e11b8152600481018390523391839183916001600160a01b031690636352211e90602401602060405180830381865afa1580156106f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107169190610de3565b6001600160a01b03161461075c5760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc819195b9a5959609a1b60448201526064016102c9565b6001600082815260200190815260200160002060010154600014156040518060400160405280601781526020017f4465706f736974206e6f7420636f6e666967757265642e000000000000000000815250906107cb5760405162461bcd60e51b81526004016102c99190610e13565b506000838152600160205260408120600281015490910361082e5760405162461bcd60e51b815260206004820181905260248201527f6d696e45787065637465645072696365206e6f7420636f6e666967757265642160448201526064016102c9565b848160020154126108815760405162461bcd60e51b815260206004820152601260248201527f4e65772076616c756520696e76616c696421000000000000000000000000000060448201526064016102c9565b60020193909355505050565b60008054604080517ffeaf968c000000000000000000000000000000000000000000000000000000008152905183926001600160a01b03169163feaf968c9160048083019260a09291908290030181865afa1580156108f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109149190610e99565b5050509150506305f5e1008161092a9190610eff565b91505090565b6002546040516331a9108f60e11b8152600481018390523391839183916001600160a01b031690636352211e90602401602060405180830381865afa15801561097d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109a19190610de3565b6001600160a01b0316146109e75760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc819195b9a5959609a1b60448201526064016102c9565b6001600082815260200190815260200160002060010154600014156040518060400160405280601781526020017f4465706f736974206e6f7420636f6e666967757265642e00000000000000000081525090610a565760405162461bcd60e51b81526004016102c99190610e13565b5060008381526001602052604090206003810154610a75903490610f57565b6003820155341561069f576040513490859033907f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a1590600090a450505050565b6002546040516331a9108f60e11b8152600481018390523391839183916001600160a01b031690636352211e90602401602060405180830381865afa158015610b02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b269190610de3565b6001600160a01b031614610b6c5760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc819195b9a5959609a1b60448201526064016102c9565b6001600082815260200190815260200160002060010154600014156040518060400160405280601781526020017f4465706f736974206e6f7420636f6e666967757265642e00000000000000000081525090610bdb5760405162461bcd60e51b81526004016102c99190610e13565b506127108410610c2d5760405162461bcd60e51b815260206004820152601760248201527f546f6f206c6f6e67206c6f636b757020706572696f642100000000000000000060448201526064016102c9565b600083815260016020526040902080548511610c8b5760405162461bcd60e51b815260206004820152601e60248201527f4e6577206c6f636b466f72446179732076616c756520696e76616c696421000060448201526064016102c9565b93909355505050565b6000818152600160208181526040808420909201548251808401909352601783527f4465706f736974206e6f7420636f6e666967757265642e00000000000000000091830191909152610cfa5760405162461bcd60e51b81526004016102c99190610e13565b5060008281526001602081815260408084208151608081018352815480825294820154938101939093526002810154918301919091526003015460608201529190610d489062015180610f70565b8260200151610d579190610f57565b905042811015610d6b575060019392505050565b8160400151600003610d81575060009392505050565b610d8961088d565b82604001511215610d9e575060019392505050565b5060009392505050565b600060208284031215610dba57600080fd5b5035919050565b60008060408385031215610dd457600080fd5b50508035926020909101359150565b600060208284031215610df557600080fd5b81516001600160a01b0381168114610e0c57600080fd5b9392505050565b600060208083528351808285015260005b81811015610e4057858101830151858201604001528201610e24565b506000604082860101526040601f19601f8301168501019250505092915050565b600060208284031215610e7357600080fd5b5051919050565b805169ffffffffffffffffffff81168114610e9457600080fd5b919050565b600080600080600060a08688031215610eb157600080fd5b610eba86610e7a565b9450602086015193506040860151925060608601519150610edd60808701610e7a565b90509295509295909350565b634e487b7160e01b600052601160045260246000fd5b600082610f1c57634e487b7160e01b600052601260045260246000fd5b7f8000000000000000000000000000000000000000000000000000000000000000821460001984141615610f5257610f52610ee9565b500590565b80820180821115610f6a57610f6a610ee9565b92915050565b8082028115828204841417610f6a57610f6a610ee956fea2646970667358221220226e109ca32f38724d1c0ec96ff99554431ad70c29192fdad46deeddaefd5b6b64736f6c634300081400336080604052600060015560006002553480156200001b57600080fd5b50604051620015cc380380620015cc8339810160408190526200003e9162000145565b600080546001600160a01b0319166001600160a01b03851617905560036200006783826200025e565b5060046200007682826200025e565b505050506200032a565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000a857600080fd5b81516001600160401b0380821115620000c557620000c562000080565b604051601f8301601f19908116603f01168101908282118183101715620000f057620000f062000080565b816040528381526020925086838588010111156200010d57600080fd5b600091505b8382101562000131578582018301518183018401529082019062000112565b600093810190920192909252949350505050565b6000806000606084860312156200015b57600080fd5b83516001600160a01b03811681146200017357600080fd5b60208501519093506001600160401b03808211156200019157600080fd5b6200019f8783880162000096565b93506040860151915080821115620001b657600080fd5b50620001c58682870162000096565b9150509250925092565b600181811c90821680620001e457607f821691505b6020821081036200020557634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200025957600081815260208120601f850160051c81016020861015620002345750805b601f850160051c820191505b81811015620002555782815560010162000240565b5050505b505050565b81516001600160401b038111156200027a576200027a62000080565b62000292816200028b8454620001cf565b846200020b565b602080601f831160018114620002ca5760008415620002b15750858301515b600019600386901b1c1916600185901b17855562000255565b600085815260208120601f198616915b82811015620002fb57888601518255948401946001909101908401620002da565b50858210156200031a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611292806200033a6000396000f3fe608060405234801561001057600080fd5b50600436106101825760003560e01c806370a08231116100d8578063a6e7f3a31161008c578063d7a78db811610066578063d7a78db814610320578063e985e9c514610333578063f851a4401461036f57600080fd5b8063a6e7f3a3146102e7578063b88d4fde146102fa578063c293206e1461030d57600080fd5b806395d89b41116100bd57806395d89b41146102a9578063a0894799146102b1578063a22cb465146102d457600080fd5b806370a0823114610283578063781b98a71461029657600080fd5b806323b872dd1161013a57806361b8ce8c1161011457806361b8ce8c146102545780636352211e1461025d5780636a6278421461027057600080fd5b806323b872dd1461021b57806342842e0e1461022e57806342966c681461024157600080fd5b8063081812fc1161016b578063081812fc146101c4578063095ea7b3146101ef57806318160ddd1461020457600080fd5b806301ffc9a71461018757806306fdde03146101af575b600080fd5b61019a610195366004610f79565b610382565b60405190151581526020015b60405180910390f35b6101b76103eb565b6040516101a69190610fe3565b6101d76101d2366004610ff6565b610479565b6040516001600160a01b0390911681526020016101a6565b6102026101fd36600461102b565b6104d9565b005b61020d60025481565b6040519081526020016101a6565b610202610229366004611055565b6105f0565b61020261023c366004611055565b610767565b61020261024f366004610ff6565b610792565b61020d60015481565b6101d761026b366004610ff6565b6108a5565b61020261027e366004611091565b6108c2565b61020d610291366004611091565b6109a8565b6102026102a43660046110ac565b6109f8565b6101b7610a8d565b61019a6102bf366004610ff6565b60056020526000908152604090205460ff1681565b6102026102e2366004611147565b610a9a565b6102026102f5366004611055565b610b14565b6102026103083660046110ac565b610ba5565b61020261031b366004611055565b610bf9565b61020261032e366004610ff6565b610c6c565b61019a610341366004611183565b6001600160a01b03918216600090815260096020908152604080832093909416825291909152205460ff1690565b6000546101d7906001600160a01b031681565b60006001600160e01b031982167f80ac58cd0000000000000000000000000000000000000000000000000000000014806103e557506001600160e01b031982167f01ffc9a700000000000000000000000000000000000000000000000000000000145b92915050565b600380546103f8906111b6565b80601f0160208091040260200160405190810160405280929190818152602001828054610424906111b6565b80156104715780601f1061044657610100808354040283529160200191610471565b820191906000526020600020905b81548152906001019060200180831161045457829003601f168201915b505050505081565b60008181526006602052604081205482906001600160a01b03166104b857604051637e27328960e01b8152600481018290526024015b60405180910390fd5b6000838152600860205260409020546001600160a01b031691505b50919050565b60008181526006602052604090205481906001600160a01b031661051357604051637e27328960e01b8152600481018290526024016104af565b8133610534826000908152600660205260409020546001600160a01b031690565b6001600160a01b03161461057b5760405162461bcd60e51b815260206004820152600e60248201526d4163636573732064656e6965642160901b60448201526064016104af565b60405183906001600160a01b0386169033907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590600090a450506000908152600860205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b60008181526005602052604090205460ff161561064f5760405162461bcd60e51b815260206004820152601060248201527f546f6b656e2069732066726f7a656e210000000000000000000000000000000060448201526064016104af565b6001600160a01b038216610681576040516346cce84160e01b81526001600160a01b03831660048201526024016104af565b61068b3382610d8a565b6001600160a01b038316156106bb576001600160a01b038316600090815260076020526040902080546000190190555b6001600160a01b038216156106ea576001600160a01b0382166000908152600760205260409020805460010190555b80826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46000908152600660205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b039290921691909117905550565b61078283838360405180602001604052806000815250610e38565b61078d8383836105f0565b505050565b60008181526006602052604090205481906001600160a01b03166107cc57604051637e27328960e01b8152600481018290526024016104af565b6000546001600160a01b031633146108175760405162461bcd60e51b815260206004820152600e60248201526d4163636573732064656e6965642160901b60448201526064016104af565b600082815260066020818152604080842080546001600160a01b031680865260078452828620805460001990810190915560028054909101905587865293909252815473ffffffffffffffffffffffffffffffffffffffff1916909155519091849183907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a4505050565b6000818152600660205260408120546001600160a01b03166103e5565b6000546001600160a01b0316331461090d5760405162461bcd60e51b815260206004820152600e60248201526d4163636573732064656e6965642160901b60448201526064016104af565b60018054600090815260066020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03861690811790915592549051909291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a46001600160a01b0316600090815260076020526040902080546001908101909155805481018155600280549091019055565b60006001600160a01b0382166109dc576040516346cce84160e01b81526001600160a01b03831660048201526024016104af565b506001600160a01b031660009081526007602052604090205490565b8233610a19826000908152600660205260409020546001600160a01b031690565b6001600160a01b031614610a605760405162461bcd60e51b815260206004820152600e60248201526d4163636573732064656e6965642160901b60448201526064016104af565b610a6d8686868686610ba5565b5050506000908152600560205260409020805460ff191660011790555050565b600480546103f8906111b6565b60405181151581526001600160a01b0383169033907f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319060200160405180910390a33360009081526009602090815260408083206001600160a01b0395909516835293905291909120805460ff1916911515919091179055565b8033610b35826000908152600660205260409020546001600160a01b031690565b6001600160a01b031614610b7c5760405162461bcd60e51b815260206004820152600e60248201526d4163636573732064656e6965642160901b60448201526064016104af565b610b87848484610767565b506000908152600560205260409020805460ff191660011790555050565b610be785858585858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610e3892505050565b610bf28585856105f0565b5050505050565b8033610c1a826000908152600660205260409020546001600160a01b031690565b6001600160a01b031614610c615760405162461bcd60e51b815260206004820152600e60248201526d4163636573732064656e6965642160901b60448201526064016104af565b610b878484846105f0565b60008181526006602052604090205481906001600160a01b0316610ca657604051637e27328960e01b8152600481018290526024016104af565b8133610cc7826000908152600660205260409020546001600160a01b031690565b6001600160a01b031614610d0e5760405162461bcd60e51b815260206004820152600e60248201526d4163636573732064656e6965642160901b60448201526064016104af565b60008381526005602052604090205460ff1615610d6d5760405162461bcd60e51b815260206004820152601860248201527f546f6b656e20697320616c72656164792066726f7a656e21000000000000000060448201526064016104af565b50506000908152600560205260409020805460ff19166001179055565b60008181526006602090815260408083205460088352818420546001600160a01b0391821680865260098552838620888416808852955292909420549193838514939116149060ff168280610ddc5750815b80610de45750805b610e305760405162461bcd60e51b815260206004820152600d60248201527f4163636573732064656e6965640000000000000000000000000000000000000060448201526064016104af565b505050505050565b6001600160a01b0383163b15610f5a57604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610e7a903390889087908790600401611203565b6020604051808303816000875af1925050508015610eb5575060408051601f3d908101601f19168201909252610eb29181019061123f565b60015b610f1e573d808015610ee3576040519150601f19603f3d011682016040523d82523d6000602084013e610ee8565b606091505b508051600003610f1657604051633250574960e11b81526001600160a01b03851660048201526024016104af565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b14610bf257604051633250574960e11b81526001600160a01b03851660048201526024016104af565b50505050565b6001600160e01b031981168114610f7657600080fd5b50565b600060208284031215610f8b57600080fd5b8135610f9681610f60565b9392505050565b6000815180845260005b81811015610fc357602081850181015186830182015201610fa7565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610f966020830184610f9d565b60006020828403121561100857600080fd5b5035919050565b80356001600160a01b038116811461102657600080fd5b919050565b6000806040838503121561103e57600080fd5b6110478361100f565b946020939093013593505050565b60008060006060848603121561106a57600080fd5b6110738461100f565b92506110816020850161100f565b9150604084013590509250925092565b6000602082840312156110a357600080fd5b610f968261100f565b6000806000806000608086880312156110c457600080fd5b6110cd8661100f565b94506110db6020870161100f565b935060408601359250606086013567ffffffffffffffff808211156110ff57600080fd5b818801915088601f83011261111357600080fd5b81358181111561112257600080fd5b89602082850101111561113457600080fd5b9699959850939650602001949392505050565b6000806040838503121561115a57600080fd5b6111638361100f565b91506020830135801515811461117857600080fd5b809150509250929050565b6000806040838503121561119657600080fd5b61119f8361100f565b91506111ad6020840161100f565b90509250929050565b600181811c908216806111ca57607f821691505b6020821081036104d3577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006001600160a01b038087168352808616602084015250836040830152608060608301526112356080830184610f9d565b9695505050505050565b60006020828403121561125157600080fd5b8151610f9681610f6056fea2646970667358221220948f362a5e2d00b50cf8ac5c50941c43cec5cab533dcac4d60e4d510d9f278d364736f6c63430008140033";

type ETHLockerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ETHLockerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ETHLocker__factory extends ContractFactory {
  constructor(...args: ETHLockerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _priceFeed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ETHLocker> {
    return super.deploy(_priceFeed, overrides || {}) as Promise<ETHLocker>;
  }
  override getDeployTransaction(
    _priceFeed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_priceFeed, overrides || {});
  }
  override attach(address: string): ETHLocker {
    return super.attach(address) as ETHLocker;
  }
  override connect(signer: Signer): ETHLocker__factory {
    return super.connect(signer) as ETHLocker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ETHLockerInterface {
    return new utils.Interface(_abi) as ETHLockerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ETHLocker {
    return new Contract(address, _abi, signerOrProvider) as ETHLocker;
  }
}
