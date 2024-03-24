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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface DPLRInterface extends utils.Interface {
  functions: {
    "DEFAULT_CODE()": FunctionFragment;
    "FAA()": FunctionFragment;
    "_codeSalt(string)": FunctionFragment;
    "changeCode(string)": FunctionFragment;
    "createdContracts(uint256)": FunctionFragment;
    "deploy(bytes,string)": FunctionFragment;
    "getFromLastAddress(uint256)": FunctionFragment;
    "getLastAddress()": FunctionFragment;
    "lasttAddress()": FunctionFragment;
    "makeSalt(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_CODE"
      | "FAA"
      | "_codeSalt"
      | "changeCode"
      | "createdContracts"
      | "deploy"
      | "getFromLastAddress"
      | "getLastAddress"
      | "lasttAddress"
      | "makeSalt"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_CODE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "FAA", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "_codeSalt",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "changeCode",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createdContracts",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "deploy",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFromLastAddress",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLastAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lasttAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "makeSalt",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_CODE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "FAA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_codeSalt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "changeCode", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createdContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFromLastAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lasttAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "makeSalt", data: BytesLike): Result;

  events: {};
}

export interface DPLR extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DPLRInterface;

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
    DEFAULT_CODE(overrides?: CallOverrides): Promise<[string]>;

    FAA(overrides?: CallOverrides): Promise<[string]>;

    _codeSalt(
      _code: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    changeCode(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createdContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    deploy(
      bytecode: PromiseOrValue<BytesLike>,
      _saltCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFromLastAddress(
      _saltCode: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getLastAddress(overrides?: CallOverrides): Promise<[string]>;

    lasttAddress(overrides?: CallOverrides): Promise<[string]>;

    makeSalt(
      _code: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  DEFAULT_CODE(overrides?: CallOverrides): Promise<string>;

  FAA(overrides?: CallOverrides): Promise<string>;

  _codeSalt(
    _code: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  changeCode(
    name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createdContracts(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  deploy(
    bytecode: PromiseOrValue<BytesLike>,
    _saltCode: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFromLastAddress(
    _saltCode: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getLastAddress(overrides?: CallOverrides): Promise<string>;

  lasttAddress(overrides?: CallOverrides): Promise<string>;

  makeSalt(
    _code: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    DEFAULT_CODE(overrides?: CallOverrides): Promise<string>;

    FAA(overrides?: CallOverrides): Promise<string>;

    _codeSalt(
      _code: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeCode(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    createdContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    deploy(
      bytecode: PromiseOrValue<BytesLike>,
      _saltCode: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getFromLastAddress(
      _saltCode: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getLastAddress(overrides?: CallOverrides): Promise<string>;

    lasttAddress(overrides?: CallOverrides): Promise<string>;

    makeSalt(
      _code: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    DEFAULT_CODE(overrides?: CallOverrides): Promise<BigNumber>;

    FAA(overrides?: CallOverrides): Promise<BigNumber>;

    _codeSalt(
      _code: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeCode(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createdContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deploy(
      bytecode: PromiseOrValue<BytesLike>,
      _saltCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFromLastAddress(
      _saltCode: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLastAddress(overrides?: CallOverrides): Promise<BigNumber>;

    lasttAddress(overrides?: CallOverrides): Promise<BigNumber>;

    makeSalt(
      _code: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_CODE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    FAA(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _codeSalt(
      _code: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeCode(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createdContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deploy(
      bytecode: PromiseOrValue<BytesLike>,
      _saltCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFromLastAddress(
      _saltCode: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLastAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lasttAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    makeSalt(
      _code: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}