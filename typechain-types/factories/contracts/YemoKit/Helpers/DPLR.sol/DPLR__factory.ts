/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  DPLR,
  DPLRInterface,
} from "../../../../../contracts/YemoKit/Helpers/DPLR.sol/DPLR";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DEFAULT_CODE",
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
    name: "FAA",
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
        name: "_code",
        type: "string",
      },
    ],
    name: "_codeSalt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "changeCode",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "createdContracts",
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
        name: "bytecode",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "_saltCode",
        type: "string",
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
        internalType: "uint256",
        name: "_saltCode",
        type: "uint256",
      },
    ],
    name: "getFromLastAddress",
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
    name: "getLastAddress",
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
    name: "lasttAddress",
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
        internalType: "uint256",
        name: "_code",
        type: "uint256",
      },
    ],
    name: "makeSalt",
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
] as const;

const _bytecode =
  "0x60c0604052600460809081526359656d6f60e01b60a0526000906100239082610130565b50600060045534801561003557600080fd5b5060405161004290610084565b604051809103906000f08015801561005e573d6000803e3d6000fd5b50600180546001600160a01b0319166001600160a01b03929092169190911790556101ef565b61025480610a3583390190565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806100bb57607f821691505b6020821081036100db57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561012b57600081815260208120601f850160051c810160208610156101085750805b601f850160051c820191505b8181101561012757828155600101610114565b5050505b505050565b81516001600160401b0381111561014957610149610091565b61015d8161015784546100a7565b846100e1565b602080601f831160018114610192576000841561017a5750858301515b600019600386901b1c1916600185901b178555610127565b600085815260208120601f198616915b828110156101c1578886015182559484019460019091019084016101a2565b50858210156101df5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610837806101fe6000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c806330e9014511610076578063544210d81161005b578063544210d8146101a157806371a2ee52146101b6578063d0c35873146101c757600080fd5b806330e901451461016d57806337536c4a1461018e57600080fd5b80631db953a1116100a75780631db953a11461011e578063272f6a8d146101315780632c26914e1461015a57600080fd5b806308811397146100c35780630bba7f9314610109575b600080fd5b6100ec6100d1366004610473565b6002602052600090815260409020546001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61011c61011736600461053f565b6101da565b005b6003546100ec906001600160a01b031681565b6100ec61013f366004610473565b6000908152600260205260409020546001600160a01b031690565b6001546100ec906001600160a01b031681565b61018061017b366004610473565b6101ea565b604051908152602001610100565b61018061019c36600461053f565b61022b565b6101a961023e565b60405161010091906105cc565b6003546001600160a01b03166100ec565b6100ec6101d53660046105df565b6102cc565b60006101e682826106e3565b5050565b600454604080516020810184905290810183905260608101919091526000906080015b60408051601f19818403018152919052805160209091012092915050565b60008160405160200161020d91906107a3565b6000805461024b9061065a565b80601f01602080910402602001604051908101604052809291908181526020018280546102779061065a565b80156102c45780601f10610299576101008083540402835291602001916102c4565b820191906000526020600020905b8154815290600101906020018083116102a757829003601f168201915b505050505081565b6000806102db61017b8461022b565b6001546040517f61ff715f0000000000000000000000000000000000000000000000000000000081529192506001600160a01b0316906361ff715f9061032790849088906004016107bf565b6020604051808303816000875af1158015610346573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036a91906107d8565b506001546040517f27e6daba0000000000000000000000000000000000000000000000000000000081526001600160a01b03909116906327e6daba906103b690849088906004016107bf565b602060405180830381865afa1580156103d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f791906107d8565b6003805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03929092169182179055600260006104308661022b565b81526020810191909152604001600020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392831617905560035416949350505050565b60006020828403121561048557600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156104bd576104bd61048c565b604051601f8501601f19908116603f011681019082821181831017156104e5576104e561048c565b816040528093508581528686860111156104fe57600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011261052957600080fd5b610538838335602085016104a2565b9392505050565b60006020828403121561055157600080fd5b813567ffffffffffffffff81111561056857600080fd5b61057484828501610518565b949350505050565b60005b8381101561059757818101518382015260200161057f565b50506000910152565b600081518084526105b881602086016020860161057c565b601f01601f19169290920160200192915050565b60208152600061053860208301846105a0565b600080604083850312156105f257600080fd5b823567ffffffffffffffff8082111561060a57600080fd5b818501915085601f83011261061e57600080fd5b61062d868335602085016104a2565b9350602085013591508082111561064357600080fd5b5061065085828601610518565b9150509250929050565b600181811c9082168061066e57607f821691505b60208210810361068e57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156106de57600081815260208120601f850160051c810160208610156106bb5750805b601f850160051c820191505b818110156106da578281556001016106c7565b5050505b505050565b815167ffffffffffffffff8111156106fd576106fd61048c565b6107118161070b845461065a565b84610694565b602080601f831160018114610746576000841561072e5750858301515b600019600386901b1c1916600185901b1785556106da565b600085815260208120601f198616915b8281101561077557888601518255948401946001909101908401610756565b50858210156107935787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082516107b581846020870161057c565b9190910192915050565b82815260406020820152600061057460408301846105a0565b6000602082840312156107ea57600080fd5b81516001600160a01b038116811461053857600080fdfea26469706673582212200b92da9b503de0cfefa0593496789a34fa3c40f28862217699dfd5d4c089fd0c64736f6c63430008140033608060405234801561001057600080fd5b50610234806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806327e6daba1461003b57806361ff715f146100e6575b600080fd5b6100bd610049366004610143565b8051602091820120604080517fff00000000000000000000000000000000000000000000000000000000000000818501523060601b6bffffffffffffffffffffffff191660218201526035810194909452605580850192909252805180850390920182526075909301909252815191012090565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6100bd6100f4366004610143565b6000808383516020850134f59050803b61010d57600080fd5b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806040838503121561015657600080fd5b82359150602083013567ffffffffffffffff8082111561017557600080fd5b818501915085601f83011261018957600080fd5b81358181111561019b5761019b610114565b604051601f8201601f19908116603f011681019083821181831017156101c3576101c3610114565b816040528281528860208487010111156101dc57600080fd5b826020860160208301376000602084830101528095505050505050925092905056fea264697066735822122065448ad862f670c5716b138780af2ddfe380142b30d68ee88c007b0bd738c2b064736f6c63430008140033";

type DPLRConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DPLRConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DPLR__factory extends ContractFactory {
  constructor(...args: DPLRConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DPLR> {
    return super.deploy(overrides || {}) as Promise<DPLR>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DPLR {
    return super.attach(address) as DPLR;
  }
  override connect(signer: Signer): DPLR__factory {
    return super.connect(signer) as DPLR__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DPLRInterface {
    return new utils.Interface(_abi) as DPLRInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): DPLR {
    return new Contract(address, _abi, signerOrProvider) as DPLR;
  }
}