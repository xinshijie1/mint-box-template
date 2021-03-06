/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface DelegatePayInterface extends ethers.utils.Interface {
  functions: {
    "delegatePay(address,address,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "delegatePay",
    values: [string, string, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "delegatePay",
    data: BytesLike
  ): Result;

  events: {
    "DelegatePaid(address,address,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DelegatePaid"): EventFragment;
}

export type DelegatePaidEvent = TypedEvent<
  [string, string, BigNumber, string] & {
    dest: string;
    payToken: string;
    amount: BigNumber;
    data: string;
  }
>;

export class DelegatePay extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: DelegatePayInterface;

  functions: {
    delegatePay(
      dest: string,
      payToken: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  delegatePay(
    dest: string,
    payToken: string,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    delegatePay(
      dest: string,
      payToken: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "DelegatePaid(address,address,uint256,bytes)"(
      dest?: null,
      payToken?: null,
      amount?: null,
      data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { dest: string; payToken: string; amount: BigNumber; data: string }
    >;

    DelegatePaid(
      dest?: null,
      payToken?: null,
      amount?: null,
      data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { dest: string; payToken: string; amount: BigNumber; data: string }
    >;
  };

  estimateGas: {
    delegatePay(
      dest: string,
      payToken: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    delegatePay(
      dest: string,
      payToken: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
