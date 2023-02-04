import { LayeredAssetInfo } from "../../interfaces/generate/collection.interface"
import { LayerData } from "../../interfaces/generate/file.interface"
import {
  LayeredAssetAttribute,
  LayeredTicketMetadata
} from "../../interfaces/generate/metadata.interface"
import { isLowerTail, weightedRandom } from "../random/random"

export function generateRandomLayer(
  form: LayeredAssetInfo,
  layers: LayerData[]
) {
  let generatedAmount = 0
  let id = 1
  const metadata: LayeredTicketMetadata[] = []
  const checkHashes: string[] = []

  while (generatedAmount <= form.generationAmount) {
    const assetAttributes: LayeredAssetAttribute[] = []

    // Randomize attributes that will be generated
    for (const layer of layers) {
      // Randomly skip layer based on its layer occurrence value
      const isLower = isLowerTail(layer.layerOccurrence / 100)
      if (!isLower) {
        continue
      }

      const occurrences = layer.assets.map((asset) => asset.occurrence)
      if (layer.assets.length > 1) {
        // requires checking since weightedRandom does not account for assets length of 1
        const rndIndex = weightedRandom(occurrences, layer.assets)
        assetAttributes.push({
          layerId: layer.layerId,
          layerName: layer.layerName,
          layerOccurrence: layer.layerOccurrence,
          asset: layer.assets[rndIndex]
        })
      } else {
        const isAssetLower = isLowerTail(layer.assets[0].occurrence / 100)
        if (isAssetLower) {
          assetAttributes.push({
            layerId: layer.layerId,
            layerName: layer.layerName,
            layerOccurrence: layer.layerOccurrence,
            asset: layer.assets[0]
          })
        }
      }
    }
    // Check for duplicated asset
    const checkHash = generateCheckHash(assetAttributes)
    const isDuplicated = checkDuplicateHash(checkHashes, checkHash)
    if (isDuplicated) {
      continue
    } else {
      metadata.push({
        id: id,
        createdAt: new Date(),
        name: `${form.name}_${id}`,
        attributes: assetAttributes,
        hash: checkHash
      })
      generatedAmount++
      id++
    }
  }

  // console.table(metadata)
  return { metadata, generatedAmount, checkHashes }
}

function generateCheckHash(layers: LayeredAssetAttribute[]) {
  const hashes = layers.map((layer) => `${layer.layerId}#${layer.asset.id}`)
  return hashes.join()
}

function checkDuplicateHash(hashes: string[], hash: string) {
  return hashes.includes(hash)
}
