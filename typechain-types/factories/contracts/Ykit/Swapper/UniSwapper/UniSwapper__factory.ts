/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  UniSwapper,
  UniSwapperInterface,
} from "../../../../../contracts/Ykit/Swapper/UniSwapper/UniSwapper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_inToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_outToken",
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
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "SwapExactAmountIn",
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
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "SwapExactAmountOut",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
    ],
    name: "swapSingleHopExactAmountIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMax",
        type: "uint256",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
    ],
    name: "swapSingleHopExactAmountOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516108bb3803806108bb83398101604081905261002f9161009e565b600080546001600160a01b039586166001600160a01b03199182161790915560038054948616948216949094179093556001805492851692841692909217909155600280549190931691161790556100f2565b80516001600160a01b038116811461009957600080fd5b919050565b600080600080608085870312156100b457600080fd5b6100bd85610082565b93506100cb60208601610082565b92506100d960408601610082565b91506100e760608601610082565b905092959194509250565b6107ba806101016000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063747620411461003b578063cc19ba4f14610050575b600080fd5b61004e610049366004610659565b610063565b005b61004e61005e366004610659565b61039d565b600083116100de5760405162461bcd60e51b815260206004820152602960248201527f416d6f756e74206f75742064657369726564206d75737420626520677265617460448201527f6572207468616e2030000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6001546040516323b872dd60e01b8152336004820152306024820152604481018490526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610135573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610159919061069a565b5060015460005460405163095ea7b360e01b81526001600160a01b0391821660048201526024810185905291169063095ea7b3906044016020604051808303816000875af11580156101af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d3919061069a565b5060408051610100810182526001546001600160a01b0390811682526002548116602083015262ffffff84168284015233606083015242608083015260a0820186905260c08201859052600060e08301819052805493517fdb3e21980000000000000000000000000000000000000000000000000000000081529293909291169063db3e2198906102689085906004016106c3565b6020604051808303816000875af1158015610287573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ab9190610731565b90508381101561035a576001546001600160a01b031663a9059cbb336102d187856105f5565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015610334573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610358919061069a565b505b604080518281526020810187905233917f1357d3c374989467cd4c818233ac472351ba62f3e087a36e0156f7f2e2fdf85691015b60405180910390a25050505050565b600083116103ed5760405162461bcd60e51b815260206004820181905260248201527f416d6f756e7420696e206d7573742062652067726561746572207468616e203060448201526064016100d5565b6001546040516323b872dd60e01b8152336004820152306024820152604481018590526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610444573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610468919061069a565b5060015460005460405163095ea7b360e01b81526001600160a01b0391821660048201526024810186905291169063095ea7b3906044016020604051808303816000875af11580156104be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e2919061069a565b5060408051610100810182526001546001600160a01b0390811682526002548116602083015262ffffff84168284015233606083015242608083015260a0820186905260c08201859052600060e08301819052805493517f414bf3890000000000000000000000000000000000000000000000000000000081529293909291169063414bf389906105779085906004016106c3565b6020604051808303816000875af1158015610596573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ba9190610731565b604080518781526020810183905291925033917f49d1c4c52591c04ed89e205ef45b76232b57210c9d41f2a12eab44bc45ed9af4910161038e565b600082610602838261074a565b91508111156106535760405162461bcd60e51b815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f77000000000000000000000060448201526064016100d5565b92915050565b60008060006060848603121561066e57600080fd5b8335925060208401359150604084013562ffffff8116811461068f57600080fd5b809150509250925092565b6000602082840312156106ac57600080fd5b815180151581146106bc57600080fd5b9392505050565b610100810161065382846001600160a01b0380825116835280602083015116602084015262ffffff60408301511660408401528060608301511660608401526080820151608084015260a082015160a084015260c082015160c08401528060e08301511660e0840152505050565b60006020828403121561074357600080fd5b5051919050565b81810381811115610653577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220e1179445cc52344a123987f7c5883a312190baabaa49f896d303cc34e5e72fde64736f6c63430008140033";

type UniSwapperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniSwapperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniSwapper__factory extends ContractFactory {
  constructor(...args: UniSwapperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _router: PromiseOrValue<string>,
    _factory: PromiseOrValue<string>,
    _inToken: PromiseOrValue<string>,
    _outToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UniSwapper> {
    return super.deploy(
      _router,
      _factory,
      _inToken,
      _outToken,
      overrides || {}
    ) as Promise<UniSwapper>;
  }
  override getDeployTransaction(
    _router: PromiseOrValue<string>,
    _factory: PromiseOrValue<string>,
    _inToken: PromiseOrValue<string>,
    _outToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _router,
      _factory,
      _inToken,
      _outToken,
      overrides || {}
    );
  }
  override attach(address: string): UniSwapper {
    return super.attach(address) as UniSwapper;
  }
  override connect(signer: Signer): UniSwapper__factory {
    return super.connect(signer) as UniSwapper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniSwapperInterface {
    return new utils.Interface(_abi) as UniSwapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniSwapper {
    return new Contract(address, _abi, signerOrProvider) as UniSwapper;
  }
}
