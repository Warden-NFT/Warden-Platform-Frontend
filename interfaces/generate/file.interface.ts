export interface AssetDimension {
  width: number;
  height: number;
}

export interface UploadedAsset {
  name: string;
  dimension: AssetDimension;
  data: string;
}
