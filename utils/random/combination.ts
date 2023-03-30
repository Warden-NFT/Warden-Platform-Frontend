import { FormLayerData } from "../../interfaces/generate/file.interface"

export function calculateCombination(layers: FormLayerData[]) {
  let sum = 1
  layers.forEach((layer) => {
    sum *=
      (layer.layerOccurrence / 100) *
      (layer.assets?.length *
        layer.assets?.reduce(
          (combined, currentValue) =>
            (combined * currentValue.occurrence) / 100,
          1
        ))
  })

  return sum
}
