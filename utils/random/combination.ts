import { FormLayerData } from "../../interfaces/generate/file.interface"

export function calculateCombination(layers: FormLayerData[]) {
  const sum = layers.reduce((acc, layer) => acc * layer.assets.length, 1)
  return sum
}
