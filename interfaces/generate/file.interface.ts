export interface AssetDimension {
  width: number
  height: number
}

interface FormUploadedAsset {
  id: number
  name: string
  occurrence: number
}
export interface UploadedAsset extends FormUploadedAsset {
  data: string
  dimension: AssetDimension
}

// Uploaded asset type of the complete asset mode
export interface UploadedCompleteAsset extends UploadedAsset {
  quantity: number
}

export interface FormLayerData {
  layerId: number // String or number?
  layerName: string
  layerOccurrence: number // 100 as max (percentage)
  assets: FormUploadedAsset[]
}
export interface LayerData {
  layerId: number
  layerName: string
  layerOccurrence: number // 100 as max (percentage)
  assets: UploadedAsset[]
}
