import { Reader } from "@ethersproject/abi/lib/coders/abstract-coder";
import {
  LayeredAssetData,
  UploadedAsset,
} from "../../interfaces/generate/file.interface";
import {
  extractFolderName,
  getAssetDimension,
  getAssetFileName,
  getAssetFileURL,
} from "./detail";

export function categorizeAssetsIntoLayer(names: string[]) {
  return names.map((name, i) => {
    return {
      index: i,
      layerName: name,
      occurance: 1,
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
      };

      return resolve(asset as UploadedAsset);
    };
  });
}

//   const _layerAssets = [...layerAssets];
//   await Promise.all(
//     files.map((file) => {
//       const reader = new FileReader();
//       reader.onabort = () => console.log("file reading was aborted");
//       reader.onerror = (e) => console.log("error");
//       reader.onload = async () => {
//         const url = await getAssetFileURL(file);
//         const dimensions = await getAssetDimension(url);
//         if (!url || !dimensions) return;
//         const assetFileName =  (file);
//         const index = layerAssets.findIndex(
//           (layer) => layer.layerName === assetFileName
//         );
//         const asset: UploadedAsset = {
//           name: getAssetFileName(file),
//           dimension: dimensions,
//           data: url,
//         };
//         if (index !== -1) {
//           _layerAssets[index].assets.push(asset);
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     })
//   );
//   return _layerAssets;
