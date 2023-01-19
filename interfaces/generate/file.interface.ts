export interface AssetDimension {
  width: number
  height: number
}

interface UploadedAsset {
  id: number
  name: string
  dimension: AssetDimension
  data: string
}

// Uploaded asset type of the complete asset mode
export interface UploadedCompleteAsset extends UploadedAsset {
  quantity: number
}

// Uploaded asset type of the layered asset mode
export interface UploadedLayeredAsset extends UploadedAsset {
  occurrence: number
}

export interface LayeredAssetData {
  layerName: string // folder name of that asset
  occurrence: number // occurrence out of 100
  assets: UploadedAsset[]
}
