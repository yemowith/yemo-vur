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
    "dpl(uint256,bytes)": FunctionFragment;
    "gLdpld()": FunctionFragment;
    "ga(uint256,bytes)": FunctionFragment;
    "gldpldPy()": FunctionFragment;
    "ldpld()": FunctionFragment;
    "ldpldPy()": FunctionFragment;
    "mpy(address,string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "dpl"
      | "gLdpld"
      | "ga"
      | "gldpldPy"
      | "ldpld"
      | "ldpldPy"
      | "mpy"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "dpl",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "gLdpld", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ga",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "gldpldPy", values?: undefined): string;
  encodeFunctionData(functionFragment: "ldpld", values?: undefined): string;
  encodeFunctionData(functionFragment: "ldpldPy", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mpy",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "dpl", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gLdpld", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ga", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gldpldPy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ldpld", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ldpldPy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mpy", data: BytesLike): Result;

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
    dpl(
      _s: PromiseOrValue<BigNumberish>,
      _b: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    gLdpld(overrides?: CallOverrides): Promise<[string]>;

    ga(
      _salt: PromiseOrValue<BigNumberish>,
      bytecode: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    gldpldPy(overrides?: CallOverrides): Promise<[string]>;

    ldpld(overrides?: CallOverrides): Promise<[string]>;

    ldpldPy(overrides?: CallOverrides): Promise<[string]>;

    mpy(
      _a: PromiseOrValue<string>,
      _p: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  dpl(
    _s: PromiseOrValue<BigNumberish>,
    _b: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  gLdpld(overrides?: CallOverrides): Promise<string>;

  ga(
    _salt: PromiseOrValue<BigNumberish>,
    bytecode: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  gldpldPy(overrides?: CallOverrides): Promise<string>;

  ldpld(overrides?: CallOverrides): Promise<string>;

  ldpldPy(overrides?: CallOverrides): Promise<string>;

  mpy(
    _a: PromiseOrValue<string>,
    _p: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    dpl(
      _s: PromiseOrValue<BigNumberish>,
      _b: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    gLdpld(overrides?: CallOverrides): Promise<string>;

    ga(
      _salt: PromiseOrValue<BigNumberish>,
      bytecode: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    gldpldPy(overrides?: CallOverrides): Promise<string>;

    ldpld(overrides?: CallOverrides): Promise<string>;

    ldpldPy(overrides?: CallOverrides): Promise<string>;

    mpy(
      _a: PromiseOrValue<string>,
      _p: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    dpl(
      _s: PromiseOrValue<BigNumberish>,
      _b: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    gLdpld(overrides?: CallOverrides): Promise<BigNumber>;

    ga(
      _salt: PromiseOrValue<BigNumberish>,
      bytecode: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    gldpldPy(overrides?: CallOverrides): Promise<BigNumber>;

    ldpld(overrides?: CallOverrides): Promise<BigNumber>;

    ldpldPy(overrides?: CallOverrides): Promise<BigNumber>;

    mpy(
      _a: PromiseOrValue<string>,
      _p: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    dpl(
      _s: PromiseOrValue<BigNumberish>,
      _b: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    gLdpld(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ga(
      _salt: PromiseOrValue<BigNumberish>,
      bytecode: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    gldpldPy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ldpld(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ldpldPy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mpy(
      _a: PromiseOrValue<string>,
      _p: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}