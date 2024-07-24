/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface LockableInterface extends utils.Interface {
  functions: {
    "lock()": FunctionFragment;
    "locked()": FunctionFragment;
    "ownr()": FunctionFragment;
    "transferOwnrship(address)": FunctionFragment;
    "unlock()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "lock"
      | "locked"
      | "ownr"
      | "transferOwnrship"
      | "unlock"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "lock", values?: undefined): string;
  encodeFunctionData(functionFragment: "locked", values?: undefined): string;
  encodeFunctionData(functionFragment: "ownr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnrship",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "unlock", values?: undefined): string;

  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownr", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnrship",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;

  events: {};
}

export interface Lockable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LockableInterface;

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
    lock(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    locked(overrides?: CallOverrides): Promise<[boolean]>;

    ownr(overrides?: CallOverrides): Promise<[string]>;

    transferOwnrship(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unlock(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  lock(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  locked(overrides?: CallOverrides): Promise<boolean>;

  ownr(overrides?: CallOverrides): Promise<string>;

  transferOwnrship(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unlock(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    lock(overrides?: CallOverrides): Promise<void>;

    locked(overrides?: CallOverrides): Promise<boolean>;

    ownr(overrides?: CallOverrides): Promise<string>;

    transferOwnrship(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unlock(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    lock(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    locked(overrides?: CallOverrides): Promise<BigNumber>;

    ownr(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnrship(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unlock(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    lock(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    locked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnrship(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unlock(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
