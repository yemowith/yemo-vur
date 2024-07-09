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

export interface AdvancedERC20LockerInterface extends utils.Interface {
  functions: {
    "autoUnlock(address)": FunctionFragment;
    "batchLockTokens(address[],uint256[],uint256)": FunctionFragment;
    "batchUnlockTokens(address[])": FunctionFragment;
    "changeFeeRecipient(address)": FunctionFragment;
    "changePenaltyFee(uint256)": FunctionFragment;
    "emergencyUnlock(address)": FunctionFragment;
    "extendLock(uint256)": FunctionFragment;
    "feeRecipient()": FunctionFragment;
    "getLockInfo(address)": FunctionFragment;
    "lockTokens(uint256,uint256)": FunctionFragment;
    "locks(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "penaltyFee()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unlockTokens()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "autoUnlock"
      | "batchLockTokens"
      | "batchUnlockTokens"
      | "changeFeeRecipient"
      | "changePenaltyFee"
      | "emergencyUnlock"
      | "extendLock"
      | "feeRecipient"
      | "getLockInfo"
      | "lockTokens"
      | "locks"
      | "owner"
      | "penaltyFee"
      | "renounceOwnership"
      | "token"
      | "transferOwnership"
      | "unlockTokens"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "autoUnlock",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "batchLockTokens",
    values: [
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "batchUnlockTokens",
    values: [PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "changeFeeRecipient",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "changePenaltyFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyUnlock",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "extendLock",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "feeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLockInfo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lockTokens",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "locks",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "penaltyFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "unlockTokens",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "autoUnlock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "batchLockTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchUnlockTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeFeeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changePenaltyFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyUnlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "extendLock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLockInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockTokens", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "locks", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "penaltyFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlockTokens",
    data: BytesLike
  ): Result;

  events: {
    "EmergencyUnlocked(address,uint256,uint256)": EventFragment;
    "FeeRecipientChanged(address)": EventFragment;
    "Locked(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "PenaltyFeeChanged(uint256)": EventFragment;
    "Unlocked(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EmergencyUnlocked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeeRecipientChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Locked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PenaltyFeeChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unlocked"): EventFragment;
}

export interface EmergencyUnlockedEventObject {
  user: string;
  amount: BigNumber;
  penalty: BigNumber;
}
export type EmergencyUnlockedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  EmergencyUnlockedEventObject
>;

export type EmergencyUnlockedEventFilter =
  TypedEventFilter<EmergencyUnlockedEvent>;

export interface FeeRecipientChangedEventObject {
  newRecipient: string;
}
export type FeeRecipientChangedEvent = TypedEvent<
  [string],
  FeeRecipientChangedEventObject
>;

export type FeeRecipientChangedEventFilter =
  TypedEventFilter<FeeRecipientChangedEvent>;

export interface LockedEventObject {
  user: string;
  amount: BigNumber;
  unlockTime: BigNumber;
}
export type LockedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  LockedEventObject
>;

export type LockedEventFilter = TypedEventFilter<LockedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PenaltyFeeChangedEventObject {
  newPenaltyFee: BigNumber;
}
export type PenaltyFeeChangedEvent = TypedEvent<
  [BigNumber],
  PenaltyFeeChangedEventObject
>;

export type PenaltyFeeChangedEventFilter =
  TypedEventFilter<PenaltyFeeChangedEvent>;

export interface UnlockedEventObject {
  user: string;
  amount: BigNumber;
}
export type UnlockedEvent = TypedEvent<
  [string, BigNumber],
  UnlockedEventObject
>;

export type UnlockedEventFilter = TypedEventFilter<UnlockedEvent>;

export interface AdvancedERC20Locker extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AdvancedERC20LockerInterface;

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
    autoUnlock(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    batchLockTokens(
      users: PromiseOrValue<string>[],
      amounts: PromiseOrValue<BigNumberish>[],
      lockTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    batchUnlockTokens(
      users: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeFeeRecipient(
      newRecipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changePenaltyFee(
      newPenaltyFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    emergencyUnlock(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    extendLock(
      additionalTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    feeRecipient(overrides?: CallOverrides): Promise<[string]>;

    getLockInfo(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; unlockTime: BigNumber }
    >;

    lockTokens(
      amount: PromiseOrValue<BigNumberish>,
      lockTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    locks(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; unlockTime: BigNumber }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    penaltyFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unlockTokens(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  autoUnlock(
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  batchLockTokens(
    users: PromiseOrValue<string>[],
    amounts: PromiseOrValue<BigNumberish>[],
    lockTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  batchUnlockTokens(
    users: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeFeeRecipient(
    newRecipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changePenaltyFee(
    newPenaltyFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  emergencyUnlock(
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  extendLock(
    additionalTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  feeRecipient(overrides?: CallOverrides): Promise<string>;

  getLockInfo(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; unlockTime: BigNumber }
  >;

  lockTokens(
    amount: PromiseOrValue<BigNumberish>,
    lockTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  locks(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; unlockTime: BigNumber }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  penaltyFee(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unlockTokens(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    autoUnlock(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    batchLockTokens(
      users: PromiseOrValue<string>[],
      amounts: PromiseOrValue<BigNumberish>[],
      lockTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    batchUnlockTokens(
      users: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    changeFeeRecipient(
      newRecipient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    changePenaltyFee(
      newPenaltyFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyUnlock(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    extendLock(
      additionalTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    feeRecipient(overrides?: CallOverrides): Promise<string>;

    getLockInfo(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; unlockTime: BigNumber }
    >;

    lockTokens(
      amount: PromiseOrValue<BigNumberish>,
      lockTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    locks(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; unlockTime: BigNumber }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    penaltyFee(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unlockTokens(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "EmergencyUnlocked(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null,
      penalty?: null
    ): EmergencyUnlockedEventFilter;
    EmergencyUnlocked(
      user?: PromiseOrValue<string> | null,
      amount?: null,
      penalty?: null
    ): EmergencyUnlockedEventFilter;

    "FeeRecipientChanged(address)"(
      newRecipient?: PromiseOrValue<string> | null
    ): FeeRecipientChangedEventFilter;
    FeeRecipientChanged(
      newRecipient?: PromiseOrValue<string> | null
    ): FeeRecipientChangedEventFilter;

    "Locked(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null,
      unlockTime?: null
    ): LockedEventFilter;
    Locked(
      user?: PromiseOrValue<string> | null,
      amount?: null,
      unlockTime?: null
    ): LockedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "PenaltyFeeChanged(uint256)"(
      newPenaltyFee?: null
    ): PenaltyFeeChangedEventFilter;
    PenaltyFeeChanged(newPenaltyFee?: null): PenaltyFeeChangedEventFilter;

    "Unlocked(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): UnlockedEventFilter;
    Unlocked(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): UnlockedEventFilter;
  };

  estimateGas: {
    autoUnlock(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    batchLockTokens(
      users: PromiseOrValue<string>[],
      amounts: PromiseOrValue<BigNumberish>[],
      lockTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    batchUnlockTokens(
      users: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeFeeRecipient(
      newRecipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changePenaltyFee(
      newPenaltyFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    emergencyUnlock(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    extendLock(
      additionalTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    feeRecipient(overrides?: CallOverrides): Promise<BigNumber>;

    getLockInfo(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lockTokens(
      amount: PromiseOrValue<BigNumberish>,
      lockTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    locks(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    penaltyFee(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unlockTokens(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    autoUnlock(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    batchLockTokens(
      users: PromiseOrValue<string>[],
      amounts: PromiseOrValue<BigNumberish>[],
      lockTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    batchUnlockTokens(
      users: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeFeeRecipient(
      newRecipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changePenaltyFee(
      newPenaltyFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    emergencyUnlock(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    extendLock(
      additionalTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    feeRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLockInfo(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lockTokens(
      amount: PromiseOrValue<BigNumberish>,
      lockTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    locks(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    penaltyFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unlockTokens(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}