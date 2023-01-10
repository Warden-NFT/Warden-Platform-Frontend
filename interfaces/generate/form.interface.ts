import { CompleteCollectionInfo } from "./collection.interface";

export interface LayeredCollectionForm extends CompleteCollectionInfo {
  generateAmount: number;
  layers: CustomizeLayerForm[];
}

export interface CustomizeLayerForm {
  name: string;
  occurrence: number;
  assets: CustomizeAssetForm[];
}

export interface CustomizeAssetForm {
  id: number;
  name: string;
  occurrence: number;
}
