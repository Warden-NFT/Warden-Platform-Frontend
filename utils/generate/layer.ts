import { LayeredAssetData } from "../../interfaces/generate/file.interface";
import {
  AssetMetadata,
  AssetAttribute,
} from "../../interfaces/generate/metadata.interface";
import { isLowerTail, weightedRandom } from "../random/random";

export function generateRandomLayer(
  layeredAssets: LayeredAssetData[],
  amount: number
) {
  let generatedAmount = 0;
  const metadatas: AssetMetadata[] = [];
  const checkHashes: string[] = [];

  while (generatedAmount < amount) {
    const randomedAttributes: AssetAttribute[] = [];

    // Randomize attributes that will be generated into layer
    for (const layeredAsset of layeredAssets) {
      // Skip this layer from generation (from its occurrence)
      const isLower = isLowerTail(layeredAsset.occurrence / 100);
      if (!isLower) {
        continue;
      }

      // Include this layer from generation
      const assetsOccurances = layeredAsset.assets.map(
        (asset) => asset.occurrence
      );
      const rndIndex = weightedRandom(assetsOccurances, layeredAsset.assets);
      randomedAttributes.push({
        layerName: layeredAsset.layerName,
        layerOccurance: layeredAsset.occurrence,
        assetName: layeredAsset.assets[rndIndex].name,
        assetOccurance: layeredAsset.assets[rndIndex].occurrence,
        asset: layeredAsset.assets[rndIndex],
      });
    }

    // Check if asset is duplicated
    const checkHash = generateCheckHash(randomedAttributes);
    if (checkDuplicateHash(checkHashes, checkHash)) {
      continue;
    }

    checkHashes.push(checkHash);
    const version = generatedAmount + 1;
    metadatas.push({
      id: version,
      createdAt: new Date(),
      assetName: `${version} #${version}`,
      attributes: randomedAttributes,
      hash: checkHash,
    });
    generatedAmount++;
  }

  return { generatedAmount, metadatas, checkHashes };
}

function generateCheckHash(assets: AssetAttribute[]) {
  const hashes = assets.map((asset) => asset.assetName);
  return hashes.join();
}

function checkDuplicateHash(hashes: string[], hash: string) {
  return hashes.includes(hash);
}
