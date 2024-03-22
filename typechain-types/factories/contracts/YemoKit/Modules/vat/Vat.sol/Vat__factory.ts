/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  Vat,
  VatInterface,
} from "../../../../../../contracts/YemoKit/Modules/vat/Vat.sol/Vat";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_yk",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "intd",
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
    name: "weth",
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
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawWETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "yk",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60806040526000805460ff1916905534801561001a57600080fd5b506109018061002a6000396000f3fe60806040526004361061007f5760003560e01c80638da5cb5b1161004e5780638da5cb5b1461020c578063944f1000146102315780639f36c04614610251578063fc4dd3331461027b57600080fd5b8063184b9559146100ef5780633fc8cef31461018f57806347e7ef24146101cc57806369328dec146101ec57600080fd5b366100ea57600260009054906101000a90046001600160a01b03166001600160a01b031663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b1580156100d457600080fd5b505af11580156100e8573d6000803e3d6000fd5b005b600080fd5b3480156100fb57600080fd5b506100e861010a3660046107d0565b60008054600180547fffffffffffffffffffffffff00000000000000000000000000000000000000009081166001600160a01b0396871617825560028054909116948616949094179093557fffffffffffffffffffffff00000000000000000000000000000000000000000016610100949093169390930260ff191691909117179055565b34801561019b57600080fd5b506002546101af906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156101d857600080fd5b506100e86101e7366004610813565b61029b565b3480156101f857600080fd5b506100e861020736600461083d565b610477565b34801561021857600080fd5b506000546101af9061010090046001600160a01b031681565b34801561023d57600080fd5b506001546101af906001600160a01b031681565b34801561025d57600080fd5b5060005461026b9060ff1681565b60405190151581526020016101c3565b34801561028757600080fd5b506100e8610296366004610870565b61064a565b6002546001600160a01b03908116908316036103245760405162461bcd60e51b815260206004820152602160248201527f574554482063616e6e6f74206265206465706f7369746564206469726563746c60448201527f790000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b604051636eb1769f60e11b815233600482015230602482015281906001600160a01b0384169063dd62ed3e90604401602060405180830381865afa158015610370573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103949190610889565b10156103e25760405162461bcd60e51b815260206004820152601460248201527f416c6c6f77616e6365206e6f7420656e6f756768000000000000000000000000604482015260640161031b565b6040517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018290526001600160a01b038316906323b872dd906064016020604051808303816000875af115801561044e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047291906108a2565b505050565b6002546001600160a01b03908116908416036104fa5760405162461bcd60e51b8152602060048201526024808201527f55736520756e777261702066756e6374696f6e20746f2077697468647261772060448201527f5745544800000000000000000000000000000000000000000000000000000000606482015260840161031b565b604051636eb1769f60e11b815233600482015230602482015282906001600160a01b0385169063dd62ed3e90604401602060405180830381865afa158015610546573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056a9190610889565b10156105b85760405162461bcd60e51b815260206004820152601460248201527f416c6c6f77616e6365206e6f7420656e6f756768000000000000000000000000604482015260640161031b565b6040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b0382811660048301526024820184905284169063a9059cbb906044016020604051808303816000875af1158015610620573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064491906108a2565b50505050565b600254604051636eb1769f60e11b81523060048201526001600160a01b0390911660248201819052829163dd62ed3e90604401602060405180830381865afa15801561069a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106be9190610889565b101561070c5760405162461bcd60e51b815260206004820152601460248201527f416c6c6f77616e6365206e6f7420656e6f756768000000000000000000000000604482015260640161031b565b6002546040517f2e1a7d4d000000000000000000000000000000000000000000000000000000008152600481018390526001600160a01b0390911690632e1a7d4d90602401600060405180830381600087803b15801561076b57600080fd5b505af115801561077f573d6000803e3d6000fd5b505060405133925083156108fc02915083906000818181858888f193505050501580156107b0573d6000803e3d6000fd5b5050565b80356001600160a01b03811681146107cb57600080fd5b919050565b6000806000606084860312156107e557600080fd5b6107ee846107b4565b92506107fc602085016107b4565b915061080a604085016107b4565b90509250925092565b6000806040838503121561082657600080fd5b61082f836107b4565b946020939093013593505050565b60008060006060848603121561085257600080fd5b61085b846107b4565b92506020840135915061080a604085016107b4565b60006020828403121561088257600080fd5b5035919050565b60006020828403121561089b57600080fd5b5051919050565b6000602082840312156108b457600080fd5b815180151581146108c457600080fd5b939250505056fea26469706673582212202d18329767bb5c0eb80e966bca4bacad782ce8efa4e5776b4c57b6b47965a07564736f6c63430008140033";

type VatConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VatConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Vat__factory extends ContractFactory {
  constructor(...args: VatConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Vat> {
    return super.deploy(overrides || {}) as Promise<Vat>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Vat {
    return super.attach(address) as Vat;
  }
  override connect(signer: Signer): Vat__factory {
    return super.connect(signer) as Vat__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VatInterface {
    return new utils.Interface(_abi) as VatInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Vat {
    return new Contract(address, _abi, signerOrProvider) as Vat;
  }
}
