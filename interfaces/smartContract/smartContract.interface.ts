export interface InputData {
  indexed: boolean
  internalType: string
  name: string
  type: string
}

export interface ABIItem {
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  type: AbiType
  gas?: number
}

export interface SmartContractABI {
  date: Date
  abi: ABIItem[]
}

export interface AbiInput {
  name: string
  type: string
  indexed?: boolean
  components?: AbiInput[]
  internalType?: string
}

export interface AbiOutput {
  name: string
  type: string
  components?: AbiOutput[]
  internalType?: string
}

export type AbiType =
  | "function"
  | "constructor"
  | "event"
  | "fallback"
  | "receive"

export type StateMutabilityType = "pure" | "view" | "nonpayable" | "payable"
