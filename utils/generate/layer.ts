import {
  TicketAttribute,
  TicketsMetadata
} from "../../dtos/ticket/metadata.dto"
import { LayeredAssetInfo } from "../../interfaces/generate/collection.interface"
import {
  LayerData,
  UploadedAsset
} from "../../interfaces/generate/file.interface"
import {
  LayeredAssetAttribute,
  LayeredTicketMetadata
} from "../../interfaces/generate/metadata.interface"
import { isLowerTail, weightedRandom } from "../random/random"

/**
 * Randomly create a metadata of assets using weighted random.
 * @param form form data required for the generated metadata
 * @param layers metadata for each layer
 * @returns medata of the generated ticket asset
 */
export function generateRandomLayer(
  form: LayeredAssetInfo,
  layers: LayerData[]
) {
  let generatedAmount = 0
  let id = 1
  const metadata: LayeredTicketMetadata[] = []
  const checkHashes: string[] = []

  while (generatedAmount < form.generationAmount) {
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
      const hasVip = assetAttributes.find(
        (attr) => attr.asset.isVipAsset === true
      )
      metadata.push({
        id: id,
        createdAt: new Date(),
        name: `${form.name}_${id}`,
        attributes: assetAttributes,
        hash: checkHash,
        hasVipAsset: Boolean(hasVip)
      })
      generatedAmount++
      id++
    }
  }

  return { metadata, generatedAmount, checkHashes }
}

function generateCheckHash(layers: LayeredAssetAttribute[]) {
  const hashes = layers.map((layer) => `${layer.layerId}#${layer.asset.id}`)
  return hashes.join()
}

function checkDuplicateHash(hashes: string[], hash: string) {
  return hashes.includes(hash)
}

// ------------------------ storage & metadata ------------------------ //
export function formatAssetMetadata(
  layer: LayerData,
  asset: UploadedAsset,
  formInfo: LayeredAssetInfo
): TicketsMetadata {
  const imgUrl = `${process.env.NEXT_PUBLIC_GCP_STORAGE_URL}${formInfo.subjectOf}/assets/${asset.file.name}`
  return {
    name: asset.file.name,
    description: `An asset named ${asset.name} of ${layer.layerName} layer`,
    image: imgUrl,
    attributes: [
      {
        trait_type: "layerName",
        value: layer.layerName
      },
      {
        trait_type: "layerId",
        value: layer.layerId
      },
      {
        trait_type: "assetName",
        value: asset.name
      },
      {
        trait_type: "assetId",
        value: asset.id
      },
      {
        trait_type: "isVipAsset",
        value: asset.isVipAsset
      },
      {
        trait_type: "storageUri",
        value: imgUrl
      }
    ]
  }
}

interface TicketMetadataBlob {
  metadata: TicketsMetadata
  blob: Blob
}

export function formatLayeredAssetMetadata(
  metadata: LayeredTicketMetadata[],
  formInfo: LayeredAssetInfo,
  blobs: Blob[]
) {
  const regularTickets: TicketMetadataBlob[] = []
  const vip: TicketMetadataBlob[] = []

  metadata.forEach((data, i) => {
    const ticket: TicketsMetadata = {
      name: data.name,
      image: `${process.env.NEXT_PUBLIC_GCP_STORAGE_URL}${formInfo.subjectOf}/${data.name}`,
      description: formInfo.description,
      attributes: data.attributes.map((attribute) => {
        return {
          trait_type: attribute.layerName,
          value: attribute.asset.name
        }
      })
    }

    if (data.hasVipAsset) {
      vip.push({
        metadata: ticket,
        blob: blobs[i]
      })
    } else {
      regularTickets.push({
        metadata: ticket,
        blob: blobs[i]
      })
    }
  })

  return { regulars: regularTickets, vips: vip }
}
