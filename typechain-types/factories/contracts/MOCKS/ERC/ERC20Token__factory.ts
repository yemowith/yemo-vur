/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ERC20Token,
  ERC20TokenInterface,
} from "../../../../contracts/MOCKS/ERC/ERC20Token";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address",
        name: "initialOwner",
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
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
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
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000fa038038062000fa08339810160408190526200003491620001c4565b8083836003620000458382620002e0565b506004620000548282620002e0565b50506005805460ff19169055506001600160a01b0381166200009057604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6200009b81620000a5565b50505050620003ac565b600580546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200012757600080fd5b81516001600160401b0380821115620001445762000144620000ff565b604051601f8301601f19908116603f011681019082821181831017156200016f576200016f620000ff565b816040528381526020925086838588010111156200018c57600080fd5b600091505b83821015620001b0578582018301518183018401529082019062000191565b600093810190920192909252949350505050565b600080600060608486031215620001da57600080fd5b83516001600160401b0380821115620001f257600080fd5b620002008783880162000115565b945060208601519150808211156200021757600080fd5b50620002268682870162000115565b604086015190935090506001600160a01b03811681146200024657600080fd5b809150509250925092565b600181811c908216806200026657607f821691505b6020821081036200028757634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002db57600081815260208120601f850160051c81016020861015620002b65750805b601f850160051c820191505b81811015620002d757828155600101620002c2565b5050505b505050565b81516001600160401b03811115620002fc57620002fc620000ff565b62000314816200030d845462000251565b846200028d565b602080601f8311600181146200034c5760008415620003335750858301515b600019600386901b1c1916600185901b178555620002d7565b600085815260208120601f198616915b828110156200037d578886015182559484019460019091019084016200035c565b50858210156200039c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610be480620003bc6000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c806370a08231116100b25780638da5cb5b11610081578063a9059cbb11610066578063a9059cbb14610268578063dd62ed3e1461027b578063f2fde38b146102b457600080fd5b80638da5cb5b1461023757806395d89b411461026057600080fd5b806370a08231146101eb578063715018a61461021457806379cc67901461021c5780638456cb591461022f57600080fd5b8063313ce5671161010957806340c10f19116100ee57806340c10f19146101ba57806342966c68146101cd5780635c975abb146101e057600080fd5b8063313ce567146101a15780633f4ba83a146101b057600080fd5b806306fdde031461013b578063095ea7b31461015957806318160ddd1461017c57806323b872dd1461018e575b600080fd5b6101436102c7565b6040516101509190610a15565b60405180910390f35b61016c610167366004610a7f565b610359565b6040519015158152602001610150565b6002545b604051908152602001610150565b61016c61019c366004610aa9565b610373565b60405160128152602001610150565b6101b8610397565b005b6101b86101c8366004610a7f565b6103a9565b6101b86101db366004610ae5565b6103bf565b60055460ff1661016c565b6101806101f9366004610afe565b6001600160a01b031660009081526020819052604090205490565b6101b86103cc565b6101b861022a366004610a7f565b6103de565b6101b86103f3565b60055461010090046001600160a01b03166040516001600160a01b039091168152602001610150565b610143610403565b61016c610276366004610a7f565b610412565b610180610289366004610b20565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101b86102c2366004610afe565b610420565b6060600380546102d690610b53565b80601f016020809104026020016040519081016040528092919081815260200182805461030290610b53565b801561034f5780601f106103245761010080835404028352916020019161034f565b820191906000526020600020905b81548152906001019060200180831161033257829003601f168201915b5050505050905090565b600033610367818585610479565b60019150505b92915050565b60003361038185828561048b565b61038c858585610522565b506001949350505050565b61039f610581565b6103a76105cd565b565b6103b1610581565b6103bb828261061f565b5050565b6103c93382610655565b50565b6103d4610581565b6103a7600061068b565b6103e982338361048b565b6103bb8282610655565b6103fb610581565b6103a76106fc565b6060600480546102d690610b53565b600033610367818585610522565b610428610581565b6001600160a01b038116610470576040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600060048201526024015b60405180910390fd5b6103c98161068b565b6104868383836001610739565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461051c578181101561050d576040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526001600160a01b03841660048201526024810182905260448101839052606401610467565b61051c84848484036000610739565b50505050565b6001600160a01b03831661054c57604051634b637e8f60e11b815260006004820152602401610467565b6001600160a01b0382166105765760405163ec442f0560e01b815260006004820152602401610467565b610486838383610840565b6005546001600160a01b036101009091041633146103a7576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610467565b6105d561084b565b6005805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b0382166106495760405163ec442f0560e01b815260006004820152602401610467565b6103bb60008383610840565b6001600160a01b03821661067f57604051634b637e8f60e11b815260006004820152602401610467565b6103bb82600083610840565b600580546001600160a01b038381166101008181027fffffffffffffffffffffff0000000000000000000000000000000000000000ff85161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610704610887565b6005805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586106023390565b6001600160a01b03841661077c576040517fe602df0500000000000000000000000000000000000000000000000000000000815260006004820152602401610467565b6001600160a01b0383166107bf576040517f94280d6200000000000000000000000000000000000000000000000000000000815260006004820152602401610467565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561051c57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161083291815260200190565b60405180910390a350505050565b6104868383836108c4565b60055460ff166103a7576040517f8dfc202b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60055460ff16156103a7576040517fd93c066500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108cc610887565b6104868383836001600160a01b0383166108fd5780600260008282546108f29190610b8d565b909155506109889050565b6001600160a01b03831660009081526020819052604090205481811015610969576040517fe450d38c0000000000000000000000000000000000000000000000000000000081526001600160a01b03851660048201526024810182905260448101839052606401610467565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166109a4576002805482900390556109c3565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a0891815260200190565b60405180910390a3505050565b600060208083528351808285015260005b81811015610a4257858101830151858201604001528201610a26565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610a7a57600080fd5b919050565b60008060408385031215610a9257600080fd5b610a9b83610a63565b946020939093013593505050565b600080600060608486031215610abe57600080fd5b610ac784610a63565b9250610ad560208501610a63565b9150604084013590509250925092565b600060208284031215610af757600080fd5b5035919050565b600060208284031215610b1057600080fd5b610b1982610a63565b9392505050565b60008060408385031215610b3357600080fd5b610b3c83610a63565b9150610b4a60208401610a63565b90509250929050565b600181811c90821680610b6757607f821691505b602082108103610b8757634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561036d57634e487b7160e01b600052601160045260246000fdfea264697066735822122080366f23fbfb6d02584fa8b9825acee173fa5dfa0665a1f27aa092525f3e1bc764736f6c63430008140033";

type ERC20TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Token__factory extends ContractFactory {
  constructor(...args: ERC20TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    initialOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC20Token> {
    return super.deploy(
      name_,
      symbol_,
      initialOwner,
      overrides || {}
    ) as Promise<ERC20Token>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    initialOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      initialOwner,
      overrides || {}
    );
  }
  override attach(address: string): ERC20Token {
    return super.attach(address) as ERC20Token;
  }
  override connect(signer: Signer): ERC20Token__factory {
    return super.connect(signer) as ERC20Token__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20TokenInterface {
    return new utils.Interface(_abi) as ERC20TokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20Token {
    return new Contract(address, _abi, signerOrProvider) as ERC20Token;
  }
}