export interface AssetDimension {
  width: number;
  height: number;
}

export interface UploadedAsset {
  name: string;
  dimension: AssetDimension;
  data: string;
  occurrence: number;
}

export interface LayeredAssetData {
  layerName: string; // folder name of that asset
  occurrence: number; // occurrence out of 100
  assets: UploadedAsset[];
}