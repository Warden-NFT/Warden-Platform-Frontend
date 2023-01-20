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

export interface LayerData {
  layerId: number
  layerName: string
  assets: UploadedLayeredAsset[]
  layerOccurrence: number // 100 as max (percentage)
}

// Uploaded asset type of the layered asset mode
export interface UploadedLayeredAsset extends UploadedAsset {
  occurrence: number
}
