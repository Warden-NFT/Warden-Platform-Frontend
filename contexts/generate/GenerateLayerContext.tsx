import React, { useState, createContext, SetStateAction, Dispatch } from "react"
import { LayeredAssetInfo } from "../../interfaces/generate/collection.interface"
import { LayerData } from "../../interfaces/generate/file.interface"
import { LayeredTicketMetadata } from "../../interfaces/generate/metadata.interface"

interface GenerateLayerContextProps {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  assets: File[]
  setAssets: Dispatch<SetStateAction<File[]>>
  layers: LayerData[]
  setLayers: Dispatch<SetStateAction<LayerData[]>>
  metadata: LayeredTicketMetadata[]
  setMetadata: Dispatch<SetStateAction<LayeredTicketMetadata[]>>
  formInfo: LayeredAssetInfo
  setFormInfo: Dispatch<SetStateAction<LayeredAssetInfo>>
  metadataURI: string[]
  setMetadataURI: Dispatch<SetStateAction<string[]>>
}

export const GenerateLayerContext = createContext(
  {} as GenerateLayerContextProps
)
const GenerateLayerContextProvider = ({ ...props }) => {
  const [activeStep, setActiveStep] = useState(1)
  const [assets, setAssets] = useState<File[]>([])
  const [layers, setLayers] = useState<LayerData[]>([])
  const [metadata, setMetadata] = useState<LayeredTicketMetadata[]>([])
  const [metadataURI, setMetadataURI] = useState<string[]>([])
  const [formInfo, setFormInfo] = useState<LayeredAssetInfo>({
    currency: "ETH",
    name: "",
    description: "",
    subjectOf: "",
    ticketMetadata: { data: [] },
    price: 0,
    ticketType: "GENERAL",
    generationAmount: 1,
    hasAssetReversed: false
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
    setFormInfo,
    metadataURI,
    setMetadataURI
  }

  return <GenerateLayerContext.Provider value={values} {...props} />
}

export default GenerateLayerContextProvider
