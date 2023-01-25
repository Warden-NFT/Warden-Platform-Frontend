import React, { useState, createContext, SetStateAction, Dispatch } from "react"
import { LayeredAssetInfo } from "../../interfaces/generate/collection.interface"
import { LayerData } from "../../interfaces/generate/file.interface"
import { LayeredAssetMetadata } from "../../interfaces/generate/metadata.interface"

interface GenerateLayerContextProps {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  assets: File[]
  setAssets: Dispatch<SetStateAction<File[]>>
  layers: LayerData[]
  setLayers: Dispatch<SetStateAction<LayerData[]>>
  metadata: LayeredAssetMetadata[]
  setMetadata: Dispatch<SetStateAction<LayeredAssetMetadata[]>>
  formInfo: LayeredAssetInfo
  setFormInfo: Dispatch<SetStateAction<LayeredAssetInfo>>
}

export const GenerateLayerContext = createContext(
  {} as GenerateLayerContextProps
)
const GenerateLayerContextProvider = ({ ...props }) => {
  const [activeStep, setActiveStep] = useState(1)
  const [assets, setAssets] = useState<File[]>([])
  const [layers, setLayers] = useState<LayerData[]>([])
  const [metadata, setMetadata] = useState<LayeredAssetMetadata[]>([])
  const [formInfo, setFormInfo] = useState<LayeredAssetInfo>({
    currency: "ETH",
    name: "",
    description: "",
    subjectOf: "",
    ticketMetadata: { data: [] },
    price: 0,
    ticketType: "GENERAL",
    generationAmount: 1
  })

  const values: GenerateLayerContextProps = {
    activeStep,
    setActiveStep,
    assets,
    setAssets,
    layers,
    setLayers,
    metadata,
    setMetadata,
    formInfo,
    setFormInfo
  }

  return <GenerateLayerContext.Provider value={values} {...props} />
}

export default GenerateLayerContextProvider
