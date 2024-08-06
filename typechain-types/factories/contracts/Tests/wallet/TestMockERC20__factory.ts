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
  TestMockERC20,
  TestMockERC20Interface,
} from "../../../../contracts/Tests/wallet/TestMockERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
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
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000cd238038062000cd28339810160408190526200003491620002ab565b82826003620000448382620003ad565b506004620000538282620003ad565b5050506200006833826200007160201b60201c565b505050620004a1565b6001600160a01b038216620000a15760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b620000af60008383620000b3565b5050565b6001600160a01b038316620000e2578060026000828254620000d6919062000479565b90915550620001569050565b6001600160a01b03831660009081526020819052604090205481811015620001375760405163391434e360e21b81526001600160a01b0385166004820152602481018290526044810183905260640162000098565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216620001745760028054829003905562000193565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001d991815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200020e57600080fd5b81516001600160401b03808211156200022b576200022b620001e6565b604051601f8301601f19908116603f01168101908282118183101715620002565762000256620001e6565b816040528381526020925086838588010111156200027357600080fd5b600091505b8382101562000297578582018301518183018401529082019062000278565b600093810190920192909252949350505050565b600080600060608486031215620002c157600080fd5b83516001600160401b0380821115620002d957600080fd5b620002e787838801620001fc565b94506020860151915080821115620002fe57600080fd5b506200030d86828701620001fc565b925050604084015190509250925092565b600181811c908216806200033357607f821691505b6020821081036200035457634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620003a857600081815260208120601f850160051c81016020861015620003835750805b601f850160051c820191505b81811015620003a4578281556001016200038f565b5050505b505050565b81516001600160401b03811115620003c957620003c9620001e6565b620003e181620003da84546200031e565b846200035a565b602080601f831160018114620004195760008415620004005750858301515b600019600386901b1c1916600185901b178555620003a4565b600085815260208120601f198616915b828110156200044a5788860151825594840194600190910190840162000429565b5085821015620004695787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156200049b57634e487b7160e01b600052601160045260246000fd5b92915050565b61082180620004b16000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c806340c10f191161007657806395d89b411161005b57806395d89b4114610176578063a9059cbb1461017e578063dd62ed3e1461019157600080fd5b806340c10f191461013857806370a082311461014d57600080fd5b806318160ddd116100a757806318160ddd1461010457806323b872dd14610116578063313ce5671461012957600080fd5b806306fdde03146100c3578063095ea7b3146100e1575b600080fd5b6100cb6101ca565b6040516100d8919061066b565b60405180910390f35b6100f46100ef3660046106d5565b61025c565b60405190151581526020016100d8565b6002545b6040519081526020016100d8565b6100f46101243660046106ff565b610276565b604051601281526020016100d8565b61014b6101463660046106d5565b61029a565b005b61010861015b36600461073b565b6001600160a01b031660009081526020819052604090205490565b6100cb6102a8565b6100f461018c3660046106d5565b6102b7565b61010861019f36600461075d565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101d990610790565b80601f016020809104026020016040519081016040528092919081815260200182805461020590610790565b80156102525780601f1061022757610100808354040283529160200191610252565b820191906000526020600020905b81548152906001019060200180831161023557829003601f168201915b5050505050905090565b60003361026a8185856102c5565b60019150505b92915050565b6000336102848582856102d7565b61028f858585610373565b506001949350505050565b6102a482826103eb565b5050565b6060600480546101d990610790565b60003361026a818585610373565b6102d28383836001610421565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461036d578181101561035e576040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b61036d84848484036000610421565b50505050565b6001600160a01b0383166103b6576040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260006004820152602401610355565b6001600160a01b0382166103e05760405163ec442f0560e01b815260006004820152602401610355565b6102d2838383610528565b6001600160a01b0382166104155760405163ec442f0560e01b815260006004820152602401610355565b6102a460008383610528565b6001600160a01b038416610464576040517fe602df0500000000000000000000000000000000000000000000000000000000815260006004820152602401610355565b6001600160a01b0383166104a7576040517f94280d6200000000000000000000000000000000000000000000000000000000815260006004820152602401610355565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561036d57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161051a91815260200190565b60405180910390a350505050565b6001600160a01b03831661055357806002600082825461054891906107ca565b909155506105de9050565b6001600160a01b038316600090815260208190526040902054818110156105bf576040517fe450d38c0000000000000000000000000000000000000000000000000000000081526001600160a01b03851660048201526024810182905260448101839052606401610355565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166105fa57600280548290039055610619565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161065e91815260200190565b60405180910390a3505050565b600060208083528351808285015260005b818110156106985785810183015185820160400152820161067c565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146106d057600080fd5b919050565b600080604083850312156106e857600080fd5b6106f1836106b9565b946020939093013593505050565b60008060006060848603121561071457600080fd5b61071d846106b9565b925061072b602085016106b9565b9150604084013590509250925092565b60006020828403121561074d57600080fd5b610756826106b9565b9392505050565b6000806040838503121561077057600080fd5b610779836106b9565b9150610787602084016106b9565b90509250929050565b600181811c908216806107a457607f821691505b6020821081036107c457634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561027057634e487b7160e01b600052601160045260246000fdfea26469706673582212202ff9e19743b5d3579766c38edfc15a96b623975810398e3b61aa25f9bc9300c564736f6c63430008140033";

type TestMockERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestMockERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestMockERC20__factory extends ContractFactory {
  constructor(...args: TestMockERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestMockERC20> {
    return super.deploy(
      name,
      symbol,
      initialSupply,
      overrides || {}
    ) as Promise<TestMockERC20>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name,
      symbol,
      initialSupply,
      overrides || {}
    );
  }
  override attach(address: string): TestMockERC20 {
    return super.attach(address) as TestMockERC20;
  }
  override connect(signer: Signer): TestMockERC20__factory {
    return super.connect(signer) as TestMockERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestMockERC20Interface {
    return new utils.Interface(_abi) as TestMockERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestMockERC20 {
    return new Contract(address, _abi, signerOrProvider) as TestMockERC20;
  }
}