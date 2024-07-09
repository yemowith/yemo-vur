/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface DSAthEvntsInterface extends utils.Interface {
  functions: {};

  events: {
    "LogSetAuthority(address)": EventFragment;
    "LogSetOwner(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogSetAuthority"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogSetOwner"): EventFragment;
}

export interface LogSetAuthorityEventObject {
  authority: string;
}
export type LogSetAuthorityEvent = TypedEvent<
  [string],
  LogSetAuthorityEventObject
>;

export type LogSetAuthorityEventFilter = TypedEventFilter<LogSetAuthorityEvent>;

export interface LogSetOwnerEventObject {
  owner: string;
}
export type LogSetOwnerEvent = TypedEvent<[string], LogSetOwnerEventObject>;

export type LogSetOwnerEventFilter = TypedEventFilter<LogSetOwnerEvent>;

export interface DSAthEvnts extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DSAthEvntsInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "LogSetAuthority(address)"(
      authority?: PromiseOrValue<string> | null
    ): LogSetAuthorityEventFilter;
    LogSetAuthority(
      authority?: PromiseOrValue<string> | null
    ): LogSetAuthorityEventFilter;

    "LogSetOwner(address)"(
      owner?: PromiseOrValue<string> | null
    ): LogSetOwnerEventFilter;
    LogSetOwner(owner?: PromiseOrValue<string> | null): LogSetOwnerEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
