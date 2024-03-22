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
} from "../../../../../common";

export interface VatInterface extends utils.Interface {
  functions: {
    "deposit(address,uint256)": FunctionFragment;
    "init(address,address,address)": FunctionFragment;
    "intd()": FunctionFragment;
    "owner()": FunctionFragment;
    "weth()": FunctionFragment;
    "withdraw(address,uint256,address)": FunctionFragment;
    "withdrawWETH(uint256)": FunctionFragment;
    "yk()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deposit"
      | "init"
      | "intd"
      | "owner"
      | "weth"
      | "withdraw"
      | "withdrawWETH"
      | "yk"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deposit",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "init",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "intd", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "weth", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawWETH",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "yk", values?: undefined): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "intd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "weth", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawWETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "yk", data: BytesLike): Result;

  events: {};
}

export interface Vat extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VatInterface;

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
    deposit(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    init(
      _owner: PromiseOrValue<string>,
      _yk: PromiseOrValue<string>,
      _weth: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    intd(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    weth(overrides?: CallOverrides): Promise<[string]>;

    withdraw(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawWETH(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    yk(overrides?: CallOverrides): Promise<[string]>;
  };

  deposit(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  init(
    _owner: PromiseOrValue<string>,
    _yk: PromiseOrValue<string>,
    _weth: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  intd(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  weth(overrides?: CallOverrides): Promise<string>;

  withdraw(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawWETH(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  yk(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    deposit(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    init(
      _owner: PromiseOrValue<string>,
      _yk: PromiseOrValue<string>,
      _weth: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    intd(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    weth(overrides?: CallOverrides): Promise<string>;

    withdraw(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawWETH(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    yk(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    deposit(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    init(
      _owner: PromiseOrValue<string>,
      _yk: PromiseOrValue<string>,
      _weth: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    intd(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    weth(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawWETH(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    yk(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    init(
      _owner: PromiseOrValue<string>,
      _yk: PromiseOrValue<string>,
      _weth: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    intd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    weth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawWETH(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    yk(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
