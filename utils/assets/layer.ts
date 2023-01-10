import {
  LayeredAssetData,
  UploadedAsset,
} from "../../interfaces/generate/file.interface";
import { getAssetDimension, getAssetFileName, getAssetFileURL } from "./detail";

export function categorizeAssetsIntoLayer(names: string[]) {
  return names.map((name, i) => {
    return {
      layerName: name,
      occurrence: 100,
      assets: [],
    } as LayeredAssetData;
  });
}

export async function readAssetsAsLayer(file: File): Promise<UploadedAsset> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = (e) => reject(e);
    reader.onload = async () => {
      const url = await getAssetFileURL(file);
      const dimension = await getAssetDimension(url);
      const asset = {
        name: getAssetFileName(file),
        dimension: dimension,
        data: url,
        occurrence: 1,
      } as UploadedAsset;

      return resolve(asset);
    };
  });
}
