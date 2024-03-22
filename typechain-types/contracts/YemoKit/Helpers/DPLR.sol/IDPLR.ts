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
} from "../../../../common";

export interface IDPLRInterface extends utils.Interface {
  functions: {
    "changeCode(string)": FunctionFragment;
    "deploy(bytes,string)": FunctionFragment;
    "getFromLastAddress(uint256)": FunctionFragment;
    "getLastAddress()": FunctionFragment;
    "updateLastAddress(uint256,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "changeCode"
      | "deploy"
      | "getFromLastAddress"
      | "getLastAddress"
      | "updateLastAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "changeCode",
    values: [PromiseOrValue<string>]
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
    functionFragment: "updateLastAddress",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "changeCode", data: BytesLike): Result;
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
    functionFragment: "updateLastAddress",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IDPLR extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDPLRInterface;

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
    changeCode(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

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

    updateLastAddress(
      _salt: PromiseOrValue<BigNumberish>,
      bytecode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  changeCode(
    name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

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

  updateLastAddress(
    _salt: PromiseOrValue<BigNumberish>,
    bytecode: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    changeCode(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

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

    updateLastAddress(
      _salt: PromiseOrValue<BigNumberish>,
      bytecode: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    changeCode(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
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

    updateLastAddress(
      _salt: PromiseOrValue<BigNumberish>,
      bytecode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    changeCode(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
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

    updateLastAddress(
      _salt: PromiseOrValue<BigNumberish>,
      bytecode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
