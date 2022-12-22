export interface AssetDimension {
  width: number;
  height: number;
}

export interface UploadedAsset {
  name: string;
  dimension: AssetDimension;
  data: string;
}

export interface LayeredAssetData {
  layerName: string; // folder name of that asset
  occurance: number; // occurance out of 100
  assets: UploadedAsset[];
}