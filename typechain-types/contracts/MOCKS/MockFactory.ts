/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface MockFactoryInterface extends utils.Interface {
  functions: {
    "createERC20Token(string,string,uint8)": FunctionFragment;
    "getLastCreatedToken()": FunctionFragment;
    "lastCreatedToken()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createERC20Token"
      | "getLastCreatedToken"
      | "lastCreatedToken"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createERC20Token",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getLastCreatedToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastCreatedToken",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createERC20Token",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastCreatedToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastCreatedToken",
    data: BytesLike
  ): Result;

  events: {
    "ERC20TokenCreated(address,string,string,uint8,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ERC20TokenCreated"): EventFragment;
}

export interface ERC20TokenCreatedEventObject {
  tokenAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: BigNumber;
}
export type ERC20TokenCreatedEvent = TypedEvent<
  [string, string, string, number, BigNumber],
  ERC20TokenCreatedEventObject
>;

export type ERC20TokenCreatedEventFilter =
  TypedEventFilter<ERC20TokenCreatedEvent>;

export interface MockFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createERC20Token(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getLastCreatedToken(overrides?: CallOverrides): Promise<[string]>;

    lastCreatedToken(overrides?: CallOverrides): Promise<[string]>;
  };

  createERC20Token(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getLastCreatedToken(overrides?: CallOverrides): Promise<string>;

  lastCreatedToken(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    createERC20Token(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getLastCreatedToken(overrides?: CallOverrides): Promise<string>;

    lastCreatedToken(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "ERC20TokenCreated(address,string,string,uint8,uint256)"(
      tokenAddress?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null,
      decimals?: null,
      initialSupply?: null
    ): ERC20TokenCreatedEventFilter;
    ERC20TokenCreated(
      tokenAddress?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null,
      decimals?: null,
      initialSupply?: null
    ): ERC20TokenCreatedEventFilter;
  };

  estimateGas: {
    createERC20Token(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getLastCreatedToken(overrides?: CallOverrides): Promise<BigNumber>;

    lastCreatedToken(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createERC20Token(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getLastCreatedToken(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastCreatedToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}