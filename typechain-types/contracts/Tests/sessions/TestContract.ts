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

export interface TestContractInterface extends utils.Interface {
  functions: {
    "runTests(address,address,uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "runTests"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "runTests",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "runTests", data: BytesLike): Result;

  events: {};
}

export interface TestContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestContractInterface;

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
    runTests(
      user1: PromiseOrValue<string>,
      user2: PromiseOrValue<string>,
      sessionDuration: PromiseOrValue<BigNumberish>,
      depositAmount1: PromiseOrValue<BigNumberish>,
      withdrawAmount1: PromiseOrValue<BigNumberish>,
      depositAmount2: PromiseOrValue<BigNumberish>,
      withdrawAmount2: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  runTests(
    user1: PromiseOrValue<string>,
    user2: PromiseOrValue<string>,
    sessionDuration: PromiseOrValue<BigNumberish>,
    depositAmount1: PromiseOrValue<BigNumberish>,
    withdrawAmount1: PromiseOrValue<BigNumberish>,
    depositAmount2: PromiseOrValue<BigNumberish>,
    withdrawAmount2: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    runTests(
      user1: PromiseOrValue<string>,
      user2: PromiseOrValue<string>,
      sessionDuration: PromiseOrValue<BigNumberish>,
      depositAmount1: PromiseOrValue<BigNumberish>,
      withdrawAmount1: PromiseOrValue<BigNumberish>,
      depositAmount2: PromiseOrValue<BigNumberish>,
      withdrawAmount2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    runTests(
      user1: PromiseOrValue<string>,
      user2: PromiseOrValue<string>,
      sessionDuration: PromiseOrValue<BigNumberish>,
      depositAmount1: PromiseOrValue<BigNumberish>,
      withdrawAmount1: PromiseOrValue<BigNumberish>,
      depositAmount2: PromiseOrValue<BigNumberish>,
      withdrawAmount2: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    runTests(
      user1: PromiseOrValue<string>,
      user2: PromiseOrValue<string>,
      sessionDuration: PromiseOrValue<BigNumberish>,
      depositAmount1: PromiseOrValue<BigNumberish>,
      withdrawAmount1: PromiseOrValue<BigNumberish>,
      depositAmount2: PromiseOrValue<BigNumberish>,
      withdrawAmount2: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}