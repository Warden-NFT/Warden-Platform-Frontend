export interface PinataPinResponse {
  IpfsHash: string
  PinSize: number
  Timestamp: Date
}

export interface AssetUploadMetadata {
  id: number
  name: string
  quantity: number
  occurrence: number
}
