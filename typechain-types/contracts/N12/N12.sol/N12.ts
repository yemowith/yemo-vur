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
} from "../../../common";

export interface N12Interface extends utils.Interface {
  functions: {
    "build(address)": FunctionFragment;
    "cache()": FunctionFragment;
    "generateMultiN12Wlt(uint256)": FunctionFragment;
    "generateN12Vlt(address)": FunctionFragment;
    "getProxy(address)": FunctionFragment;
    "getUserVaults(address)": FunctionFragment;
    "isProxy(address)": FunctionFragment;
    "proxies(address)": FunctionFragment;
    "userVaults(address,uint256)": FunctionFragment;
    "userWallets(address,uint256)": FunctionFragment;
    "wallet()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "build"
      | "cache"
      | "generateMultiN12Wlt"
      | "generateN12Vlt"
      | "getProxy"
      | "getUserVaults"
      | "isProxy"
      | "proxies"
      | "userVaults"
      | "userWallets"
      | "wallet"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "build",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "cache", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "generateMultiN12Wlt",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "generateN12Vlt",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getProxy",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserVaults",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isProxy",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "proxies",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "userVaults",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "userWallets",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "wallet", values?: undefined): string;

  decodeFunctionResult(functionFragment: "build", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cache", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "generateMultiN12Wlt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "generateN12Vlt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getProxy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserVaults",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isProxy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proxies", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userVaults", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "userWallets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wallet", data: BytesLike): Result;

  events: {
    "Created(address,address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Created"): EventFragment;
}

export interface CreatedEventObject {
  sender: string;
  owner: string;
  proxy: string;
  cache: string;
}
export type CreatedEvent = TypedEvent<
  [string, string, string, string],
  CreatedEventObject
>;

export type CreatedEventFilter = TypedEventFilter<CreatedEvent>;

export interface N12 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: N12Interface;

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
    build(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cache(overrides?: CallOverrides): Promise<[string]>;

    generateMultiN12Wlt(
      count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    generateN12Vlt(
      _mainAsset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getProxy(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getUserVaults(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    isProxy(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    proxies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    userVaults(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    userWallets(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    wallet(overrides?: CallOverrides): Promise<[string]>;
  };

  build(
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cache(overrides?: CallOverrides): Promise<string>;

  generateMultiN12Wlt(
    count: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  generateN12Vlt(
    _mainAsset: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getProxy(
    owner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getUserVaults(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  isProxy(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  proxies(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  userVaults(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  userWallets(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  wallet(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    build(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    cache(overrides?: CallOverrides): Promise<string>;

    generateMultiN12Wlt(
      count: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    generateN12Vlt(
      _mainAsset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getProxy(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getUserVaults(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    isProxy(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    proxies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    userVaults(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    userWallets(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    wallet(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Created(address,address,address,address)"(
      sender?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      proxy?: null,
      cache?: null
    ): CreatedEventFilter;
    Created(
      sender?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      proxy?: null,
      cache?: null
    ): CreatedEventFilter;
  };

  estimateGas: {
    build(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cache(overrides?: CallOverrides): Promise<BigNumber>;

    generateMultiN12Wlt(
      count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    generateN12Vlt(
      _mainAsset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getProxy(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserVaults(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isProxy(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proxies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userVaults(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userWallets(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wallet(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    build(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cache(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    generateMultiN12Wlt(
      count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    generateN12Vlt(
      _mainAsset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getProxy(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserVaults(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isProxy(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proxies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userVaults(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userWallets(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wallet(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}