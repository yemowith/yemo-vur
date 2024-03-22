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
} from "../../../../common";

export declare namespace ISTG {
  export type STGDStruct = {
    data: PromiseOrValue<BytesLike>;
    group: PromiseOrValue<BytesLike>;
    vrs: PromiseOrValue<BigNumberish>;
  };

  export type STGDStructOutput = [string, string, BigNumber] & {
    data: string;
    group: string;
    vrs: BigNumber;
  };
}

export interface ISTGInterface extends utils.Interface {
  functions: {
    "retrieveData(bytes32)": FunctionFragment;
    "storeData(bytes32,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "retrieveData" | "storeData"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "retrieveData",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "storeData",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "retrieveData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "storeData", data: BytesLike): Result;

  events: {
    "DataStored(bytes32,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DataStored"): EventFragment;
}

export interface DataStoredEventObject {
  key: string;
  group: string;
}
export type DataStoredEvent = TypedEvent<
  [string, string],
  DataStoredEventObject
>;

export type DataStoredEventFilter = TypedEventFilter<DataStoredEvent>;

export interface ISTG extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISTGInterface;

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
    retrieveData(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[ISTG.STGDStructOutput]>;

    storeData(
      _key: PromiseOrValue<BytesLike>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  retrieveData(
    key: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<ISTG.STGDStructOutput>;

  storeData(
    _key: PromiseOrValue<BytesLike>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    retrieveData(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<ISTG.STGDStructOutput>;

    storeData(
      _key: PromiseOrValue<BytesLike>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "DataStored(bytes32,bytes32)"(
      key?: PromiseOrValue<BytesLike> | null,
      group?: null
    ): DataStoredEventFilter;
    DataStored(
      key?: PromiseOrValue<BytesLike> | null,
      group?: null
    ): DataStoredEventFilter;
  };

  estimateGas: {
    retrieveData(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    storeData(
      _key: PromiseOrValue<BytesLike>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    retrieveData(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    storeData(
      _key: PromiseOrValue<BytesLike>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}