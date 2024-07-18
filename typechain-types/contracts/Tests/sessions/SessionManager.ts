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

export interface SessionManagerInterface extends utils.Interface {
  functions: {
    "endSession()": FunctionFragment;
    "executeTransaction(address,bytes)": FunctionFragment;
    "sessions(address)": FunctionFragment;
    "startSession(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "endSession"
      | "executeTransaction"
      | "sessions"
      | "startSession"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "endSession",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "executeTransaction",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "sessions",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "startSession",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "endSession", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sessions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startSession",
    data: BytesLike
  ): Result;

  events: {
    "SessionEnded(address)": EventFragment;
    "SessionStarted(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SessionEnded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SessionStarted"): EventFragment;
}

export interface SessionEndedEventObject {
  user: string;
}
export type SessionEndedEvent = TypedEvent<[string], SessionEndedEventObject>;

export type SessionEndedEventFilter = TypedEventFilter<SessionEndedEvent>;

export interface SessionStartedEventObject {
  user: string;
  duration: BigNumber;
}
export type SessionStartedEvent = TypedEvent<
  [string, BigNumber],
  SessionStartedEventObject
>;

export type SessionStartedEventFilter = TypedEventFilter<SessionStartedEvent>;

export interface SessionManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SessionManagerInterface;

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
    endSession(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeTransaction(
      target: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sessions(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { user: string; expires: BigNumber }>;

    startSession(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  endSession(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeTransaction(
    target: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sessions(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { user: string; expires: BigNumber }>;

  startSession(
    duration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    endSession(overrides?: CallOverrides): Promise<void>;

    executeTransaction(
      target: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    sessions(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { user: string; expires: BigNumber }>;

    startSession(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "SessionEnded(address)"(
      user?: PromiseOrValue<string> | null
    ): SessionEndedEventFilter;
    SessionEnded(user?: PromiseOrValue<string> | null): SessionEndedEventFilter;

    "SessionStarted(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      duration?: null
    ): SessionStartedEventFilter;
    SessionStarted(
      user?: PromiseOrValue<string> | null,
      duration?: null
    ): SessionStartedEventFilter;
  };

  estimateGas: {
    endSession(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeTransaction(
      target: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sessions(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    startSession(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    endSession(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeTransaction(
      target: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sessions(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    startSession(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
