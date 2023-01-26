import { UploadedAsset } from "./file.interface"

export interface LayeredTicketMetadata {
  id: number // Generated ID (ex. 1)
  createdAt: Date // Time that this asset got created (ex. 21-04-2001 19:01:24 in Date format)
  name: string // Name of this asset (ex. WARDEN #1)
  attributes: LayeredAssetAttribute[] // Asset's attributes in order of occurance
  hash: string // Hash string used to check if the asset has already been generated or not
}

export interface LayeredAssetAttribute {
  layerId: number
  layerName: string
  layerOccurrence: number
  asset: UploadedAsset
}
