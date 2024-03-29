import {
  UploadedAsset,
  LayerData
} from "../../interfaces/generate/file.interface"
import { getAssetDimension, getAssetFileName, getAssetFileURL } from "./detail"

export function categorizeAssetsIntoLayer(names: string[]) {
  return names.map((name, i) => {
    return {
      layerId: i + 1,
      layerName: name,
      assets: [],
      layerOccurrence: 100
    } as LayerData
  })
}

export async function readLayeredAsset(
  file: File,
  index: number
): Promise<UploadedAsset> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onabort = () => console.log("file reading was aborted")
    reader.onerror = (e) => reject(e)
    reader.onload = async () => {
      const url = await getAssetFileURL(file)
      const dimension = await getAssetDimension(url)
      const asset: UploadedAsset = {
        id: index + 1,
        name: getAssetFileName(file),
        file: file,
        dimension: dimension,
        data: url,
        occurrence: 100,
        isVipAsset: false
      }

      return resolve(asset)
    }
  })
}
