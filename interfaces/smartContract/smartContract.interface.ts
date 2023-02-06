export interface InputData {
  indexed: boolean
  internalType: string
  name: string
  type: string
}

export interface ABIItem {
  anonymous: boolean
  inputs: InputData[]
}

export interface SmartContractABI {
  date: Date
  abi: ABIItem[]
}
