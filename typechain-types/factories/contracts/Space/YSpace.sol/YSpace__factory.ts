/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  YSpace,
  YSpaceInterface,
} from "../../../../contracts/Space/YSpace.sol/YSpace";

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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldSuperAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newSuperAdmin",
        type: "address",
      },
    ],
    name: "SuperAdminChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "addressStore",
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
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "call",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "callStatic",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        internalType: "bytes32",
        name: "newSalt",
        type: "bytes32",
      },
    ],
    name: "changeSalt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newSuperAdmin",
        type: "address",
      },
    ],
    name: "changeSuperAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedData",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "additionalParam",
        type: "bytes32",
      },
    ],
    name: "decode",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
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
        internalType: "string",
        name: "savedContractName",
        type: "string",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "deployAndSetProxy",
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
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "additionalParam",
        type: "bytes32",
      },
    ],
    name: "encode",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    inputs: [
      {
        internalType: "string",
        name: "_key",
        type: "string",
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
    inputs: [
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
    ],
    name: "getData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "getEncodedData",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "getEncodedData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
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
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multiExecute",
    outputs: [
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
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
        internalType: "bytes",
        name: "code",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "saveContractCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_key",
        type: "string",
      },
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setAddress",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
      },
    ],
    name: "setData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "superAdmin",
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
        name: "encodedData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "originalData",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "additionalParam",
        type: "bytes32",
      },
    ],
    name: "validateEncodedData",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060008054600180546001600160a01b03193381811694821685178117821685178117821685178117909555169190911790911790556125d9806100556000396000f3fe60806040523480156200001157600080fd5b5060043610620001e95760003560e01c8063839eaa0a116200010d578063b17ac32d11620000a3578063c439373c116200007a578063c439373c14620004e4578063d31fcac514620004fb578063e90e36e0146200050f578063fec95c3f146200052657600080fd5b8063b17ac32d14620004ac578063b984cf8314620004c3578063bf40fac114620004cd57600080fd5b80639ef9dfff11620000e45780639ef9dfff1462000450578063a6f9dae11462000467578063ac25e0b1146200047e578063ae55c888146200049557600080fd5b8063839eaa0a14620003dd5780638da5cb5b14620004145780639b2ea4bd146200042857600080fd5b806344eb646311620001835780635df87086116200015a5780635df87086146200038157806361ff715f14620003985780636c67bdfa14620003af5780637eaeabff14620003c657600080fd5b806344eb6463146200032f578063476e106e14620003465780634a3aad11146200035a57600080fd5b80631e41f17a11620001c45780631e41f17a146200025a57806327e6daba146200027d57806329575f6a146200030257806341858c4b146200031657600080fd5b80631a8090bb14620001ee5780631b8b921d146200021d5780631cff79cd1462000243575b600080fd5b62000205620001ff36600462001a3f565b6200053d565b60405162000214919062001b61565b60405180910390f35b620002346200022e36600462001bc7565b620006ca565b60405162000214919062001c11565b620002346200025436600462001bc7565b620007d5565b6200026462000836565b6040516001600160a01b03909116815260200162000214565b620002646200028e36600462001c26565b8051602091820120604080517fff00000000000000000000000000000000000000000000000000000000000000818501523060601b6bffffffffffffffffffffffff191660218201526035810194909452605580850192909252805180850390920182526075909301909252815191012090565b60015462000264906001600160a01b031681565b6200032d6200032736600462001c59565b62000892565b005b620002346200034036600462001bc7565b620009c8565b60045462000264906001600160a01b031681565b620003716200036b36600462001c77565b62000ac9565b6040516200021492919062001cf4565b6200032d6200039236600462001d18565b62000b63565b62000264620003a936600462001c26565b62000c77565b6200032d620003c036600462001d18565b62000ccf565b62000234620003d736600462001d18565b62000d2a565b62000264620003ee36600462001d79565b80516020818301810180516002825292820191909301209152546001600160a01b031681565b60005462000264906001600160a01b031681565b6200043f6200043936600462001db2565b62000dbc565b604051901515815260200162000214565b6200043f6200046136600462001e06565b62000e1e565b6200032d6200047836600462001c59565b62000e2d565b620002346200048f36600462001e7a565b62000f2b565b62000234620004a636600462001d79565b62000f39565b62000264620004bd36600462001db2565b62000f46565b62000264620010ba565b62000264620004de36600462001d79565b62001116565b62000234620004f536600462001e7a565b62001149565b60055462000264906001600160a01b031681565b620002646200052036600462001bc7565b62001157565b6200032d6200053736600462001ec3565b620011af565b6000546060906001600160a01b031633146200058f5760405162461bcd60e51b815260206004820152601760248201526000805160206200258483398151915260448201526064015b60405180910390fd5b8151835114620005e25760405162461bcd60e51b815260206004820181905260248201527f5461726765747320616e642064617461206c656e677468206d69736d61746368604482015260640162000586565b6000835167ffffffffffffffff811115620006015762000601620018aa565b6040519080825280602002602001820160405280156200063657816020015b6060815260200190600190039081620006205790505b50905060005b8451811015620006c0576200068a8582815181106200065f576200065f62001edd565b60200260200101518583815181106200067c576200067c62001edd565b6020026020010151620011ff565b8282815181106200069f576200069f62001edd565b60200260200101819052508080620006b79062001f09565b9150506200063c565b5090505b92915050565b6000546060906001600160a01b03163314620007185760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b600080846001600160a01b03168460405162000735919062001f25565b6000604051808303816000865af19150503d806000811462000774576040519150601f19603f3d011682016040523d82523d6000602084013e62000779565b606091505b509150915081620007cd5760405162461bcd60e51b815260206004820152600b60248201527f43616c6c206661696c6564000000000000000000000000000000000000000000604482015260640162000586565b949350505050565b6000546060906001600160a01b03163314620008235760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b6200082f8383620011ff565b9392505050565b600080546001600160a01b03163314620008825760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b506004546001600160a01b031690565b6001546001600160a01b03163314620008ee5760405162461bcd60e51b815260206004820152601c60248201527f43616c6c6572206973206e6f742074686520737570657241646d696e00000000604482015260640162000586565b6001600160a01b0381166200096c5760405162461bcd60e51b815260206004820152602560248201527f4e657720737570657241646d696e20616464726573732063616e6e6f7420626560448201527f206e756c6c000000000000000000000000000000000000000000000000000000606482015260840162000586565b6001546040516001600160a01b038084169216907f6a7fb6694616d75391385b86c21a1cc2628072753f9c7da9731e7b1b083a55e490600090a3600180546001600160a01b0319166001600160a01b0392909216919091179055565b6000546060906001600160a01b0316331462000a165760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b600080846001600160a01b03168460405162000a33919062001f25565b600060405180830381855afa9150503d806000811462000a70576040519150601f19603f3d011682016040523d82523d6000602084013e62000a75565b606091505b509150915081620007cd5760405162461bcd60e51b815260206004820152601260248201527f5374617469632063616c6c206661696c65640000000000000000000000000000604482015260640162000586565b6000606084848460405160240162000ae2919062001c11565b60408051601f19818403018152908290529162000aff9162001f25565b6040519081900390206020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff000000000000000000000000000000000000000000000000000000009092169190911790529092509050935093915050565b6000546001600160a01b0316331462000bae5760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b600082511162000c015760405162461bcd60e51b815260206004820152601460248201527f436f64652063616e6e6f7420626520656d707479000000000000000000000000604482015260640162000586565b600081511162000c545760405162461bcd60e51b815260206004820152601460248201527f4e616d652063616e6e6f7420626520656d707479000000000000000000000000604482015260640162000586565b600062000c6483600754620012b6565b905062000c7282826200133b565b505050565b600080546001600160a01b0316331462000cc35760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b6200082f8383620013b5565b6000546001600160a01b0316331462000d1a5760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b62000d2682826200133b565b5050565b6060828260405160240162000d40919062001c11565b60408051601f19818403018152908290529162000d5d9162001f25565b6040519081900390206020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909216919091179052905092915050565b600080546001600160a01b0316331462000e085760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b62000e148383620013f1565b5060019392505050565b6000620007cd8484846200143e565b6000546001600160a01b0316331462000e785760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b6001600160a01b03811662000ed05760405162461bcd60e51b815260206004820152601d60248201527f4e6577206f776e657220697320746865207a65726f2061646472657373000000604482015260640162000586565b600080546040516001600160a01b03808516939216917fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c91a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60606200082f8383620012b6565b6060620006c482620014ad565b600080546001600160a01b0316331462000f925760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b600062000f9f84620014ad565b9050600081511162000ff45760405162461bcd60e51b815260206004820152601d60248201527f536176656420636f6e747261637420636f6465206e6f7420666f756e64000000604482015260640162000586565b6000620010048260075462001567565b905060006200101960035460001c83620013b5565b9050600062001029868862001782565b6040517fd784d4260000000000000000000000000000000000000000000000000000000081526001600160a01b0384811660048301529192509082169063d784d42690602401600060405180830381600087803b1580156200108a57600080fd5b505af11580156200109f573d6000803e3d6000fd5b50505050620010af8782620013f1565b509695505050505050565b600080546001600160a01b03163314620011065760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b506005546001600160a01b031690565b60006002826040516200112a919062001f25565b908152604051908190036020019020546001600160a01b031692915050565b60606200082f838362001567565b600080546001600160a01b03163314620011a35760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b6200082f838362001782565b6000546001600160a01b03163314620011fa5760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b600355565b6060600080846001600160a01b0316846040516200121e919062001f25565b6000604051808303816000865af19150503d80600081146200125d576040519150601f19603f3d011682016040523d82523d6000602084013e62001262565b606091505b509150915081620007cd5760405162461bcd60e51b815260206004820152601060248201527f457865637574696f6e206661696c656400000000000000000000000000000000604482015260640162000586565b606060008351116200130b5760405162461bcd60e51b815260206004820152601460248201527f446174612063616e6e6f7420626520656d707479000000000000000000000000604482015260640162000586565b6003548284604051602001620013249392919062001f43565b604051602081830303815290604052905092915050565b6000546001600160a01b03163314620013865760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b8060068360405162001399919062001f25565b9081526020016040518091039020908162000c72919062002000565b6000808383516020850134f59050803b620013cf57600080fd5b600480546001600160a01b0319166001600160a01b0383161790559392505050565b60008160028460405162001406919062001f25565b90815260405190819003602001902080546001600160a01b03929092166001600160a01b031990921691909117905550600192915050565b6000806200144d858462001567565b90508380519060200120818051906020012014620014705760009150506200082f565b6000818460405160200162001487929190620020cd565b60408051808303601f190181529190528051602090910120600354149695505050505050565b6060600682604051620014c1919062001f25565b90815260200160405180910390208054620014dc9062001f72565b80601f01602080910402602001604051908101604052809291908181526020018280546200150a9062001f72565b80156200155b5780601f106200152f576101008083540402835291602001916200155b565b820191906000526020600020905b8154815290600101906020018083116200153d57829003601f168201915b50505050509050919050565b60606020835111620016085760405162461bcd60e51b815260206004820152604360248201527f456e636f646564206461746120697320746f6f2073686f727420746f20636f6e60448201527f7461696e2073616c7420616e64206164646974696f6e616c20706172616d657460648201527f6572730000000000000000000000000000000000000000000000000000000000608482015260a40162000586565b602083810151600354604080519384018390528301859052909160600160405160208183030381529060405280519060200120146200168a5760405162461bcd60e51b815260206004820152601b60248201527f496e76616c696420656e636f64696e6720706172616d65746572730000000000604482015260640162000586565b6000602085516200169c9190620020f1565b67ffffffffffffffff811115620016b757620016b7620018aa565b6040519080825280601f01601f191660200182016040528015620016e2576020820181803683370190505b50905060205b8551811015620017795785818151811062001707576200170762001edd565b602001015160f81c60f81b82602083620017229190620020f1565b8151811062001735576200173562001edd565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080620017708162001f09565b915050620016e8565b50949350505050565b600080546001600160a01b03163314620017ce5760405162461bcd60e51b8152602060048201526017602482015260008051602062002584833981519152604482015260640162000586565b600082604051602001620017e3919062001f25565b6040516020818303038152906040528051906020012060001c905060006040518060200162001812906200189c565b601f1982820381018352601f9091011660408181526001600160a01b03881660208301520160408051601f198184030181529082905262001857929160200162002107565b6040516020818303038152906040529050620018748282620013b5565b600480546001600160a01b0319166001600160a01b0392909216918217905595945050505050565b610449806200213b83390190565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715620018ec57620018ec620018aa565b604052919050565b600067ffffffffffffffff821115620019115762001911620018aa565b5060051b60200190565b80356001600160a01b03811681146200193357600080fd5b919050565b600082601f8301126200194a57600080fd5b813567ffffffffffffffff811115620019675762001967620018aa565b6200197c601f8201601f1916602001620018c0565b8181528460208386010111156200199257600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f830112620019c157600080fd5b81356020620019da620019d483620018f4565b620018c0565b82815260059290921b84018101918181019086841115620019fa57600080fd5b8286015b84811015620010af57803567ffffffffffffffff81111562001a205760008081fd5b62001a308986838b010162001938565b845250918301918301620019fe565b6000806040838503121562001a5357600080fd5b823567ffffffffffffffff8082111562001a6c57600080fd5b818501915085601f83011262001a8157600080fd5b8135602062001a94620019d483620018f4565b82815260059290921b8401810191818101908984111562001ab457600080fd5b948201945b8386101562001add5762001acd866200191b565b8252948201949082019062001ab9565b9650508601359250508082111562001af457600080fd5b5062001b0385828601620019af565b9150509250929050565b60005b8381101562001b2a57818101518382015260200162001b10565b50506000910152565b6000815180845262001b4d81602086016020860162001b0d565b601f01601f19169290920160200192915050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101562001bba57603f1988860301845262001ba785835162001b33565b9450928501929085019060010162001b88565b5092979650505050505050565b6000806040838503121562001bdb57600080fd5b62001be6836200191b565b9150602083013567ffffffffffffffff81111562001c0357600080fd5b62001b038582860162001938565b6020815260006200082f602083018462001b33565b6000806040838503121562001c3a57600080fd5b82359150602083013567ffffffffffffffff81111562001c0357600080fd5b60006020828403121562001c6c57600080fd5b6200082f826200191b565b60008060006060848603121562001c8d57600080fd5b62001c98846200191b565b9250602084013567ffffffffffffffff8082111562001cb657600080fd5b62001cc48783880162001938565b9350604086013591508082111562001cdb57600080fd5b5062001cea8682870162001938565b9150509250925092565b6001600160a01b0383168152604060208201526000620007cd604083018462001b33565b6000806040838503121562001d2c57600080fd5b823567ffffffffffffffff8082111562001d4557600080fd5b62001d538683870162001938565b9350602085013591508082111562001d6a57600080fd5b5062001b038582860162001938565b60006020828403121562001d8c57600080fd5b813567ffffffffffffffff81111562001da457600080fd5b620007cd8482850162001938565b6000806040838503121562001dc657600080fd5b823567ffffffffffffffff81111562001dde57600080fd5b62001dec8582860162001938565b92505062001dfd602084016200191b565b90509250929050565b60008060006060848603121562001e1c57600080fd5b833567ffffffffffffffff8082111562001e3557600080fd5b62001e438783880162001938565b9450602086013591508082111562001e5a57600080fd5b5062001e698682870162001938565b925050604084013590509250925092565b6000806040838503121562001e8e57600080fd5b823567ffffffffffffffff81111562001ea657600080fd5b62001eb48582860162001938565b95602094909401359450505050565b60006020828403121562001ed657600080fd5b5035919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820162001f1e5762001f1e62001ef3565b5060010190565b6000825162001f3981846020870162001b0d565b9190910192915050565b8381528260208201526000825162001f6381604085016020870162001b0d565b91909101604001949350505050565b600181811c9082168062001f8757607f821691505b60208210810362001fa857634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000c7257600081815260208120601f850160051c8101602086101562001fd75750805b601f850160051c820191505b8181101562001ff85782815560010162001fe3565b505050505050565b815167ffffffffffffffff8111156200201d576200201d620018aa565b62002035816200202e845462001f72565b8462001fae565b602080601f8311600181146200206d5760008415620020545750858301515b600019600386901b1c1916600185901b17855562001ff8565b600085815260208120601f198616915b828110156200209e578886015182559484019460019091019084016200207d565b5085821015620020bd5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008351620020e181846020880162001b0d565b9190910191825250602001919050565b81810381811115620006c457620006c462001ef3565b600083516200211b81846020880162001b0d565b8351908301906200213181836020880162001b0d565b0194935050505056fe608060405234801561001057600080fd5b5060405161044938038061044983398101604081905261002f9161005b565b600080546001600160a01b031990811633909116176001600160a01b039290921691909117905561008b565b60006020828403121561006d57600080fd5b81516001600160a01b038116811461008457600080fd5b9392505050565b6103af8061009a6000396000f3fe6080604052600436106100435760003560e01c80635c60da1b1461010c5780638da5cb5b14610148578063a6f9dae114610168578063d784d4261461018857610088565b3661008857604080516020808252600090820152339134917f606834f57405380c4fb88d1f4850326ad3885f014bab3b568dfbf7a041eef738910160405180910390a3005b6001546001600160a01b0316806100e65760405162461bcd60e51b815260206004820152601960248201527f496d706c656d656e746174696f6e206e6f74207365747465640000000000000060448201526064015b60405180910390fd5b3660008037600080366000845af43d6000803e808015610105573d6000f35b3d6000fd5b005b34801561011857600080fd5b5060015461012c906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b34801561015457600080fd5b5060005461012c906001600160a01b031681565b34801561017457600080fd5b5061010a610183366004610349565b6101a8565b34801561019457600080fd5b5061010a6101a3366004610349565b6102c0565b6000546001600160a01b031633146102025760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064016100dd565b6001600160a01b0381166102585760405162461bcd60e51b815260206004820152601d60248201527f4e6577206f776e657220697320746865207a65726f206164647265737300000060448201526064016100dd565b600080546040516001600160a01b03808516939216917fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c91a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6000546001600160a01b0316331461031a5760405162461bcd60e51b815260206004820152601760248201527f43616c6c6572206973206e6f7420746865206f776e657200000000000000000060448201526064016100dd565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b60006020828403121561035b57600080fd5b81356001600160a01b038116811461037257600080fd5b939250505056fea26469706673582212204771f6432f20fe8466bbfea38e43c24aa339366cbf2e98484d3a166ca022134a64736f6c6343000814003343616c6c6572206973206e6f7420746865206f776e6572000000000000000000a26469706673582212201c44847681816116ea48487173665e01c0df56ca2ba28c430a8e958ef23b39bc64736f6c63430008140033";

type YSpaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YSpaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YSpace__factory extends ContractFactory {
  constructor(...args: YSpaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YSpace> {
    return super.deploy(overrides || {}) as Promise<YSpace>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): YSpace {
    return super.attach(address) as YSpace;
  }
  override connect(signer: Signer): YSpace__factory {
    return super.connect(signer) as YSpace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YSpaceInterface {
    return new utils.Interface(_abi) as YSpaceInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): YSpace {
    return new Contract(address, _abi, signerOrProvider) as YSpace;
  }
}
