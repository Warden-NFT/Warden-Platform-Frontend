import React, { useState, createContext, SetStateAction, Dispatch } from "react"
import { DEFAULT_CANVAS_SIZE } from "../../constants/generate/canvas"
import { LayeredAssetInfo } from "../../interfaces/generate/collection.interface"
import {
  AssetDimension,
  LayerData
} from "../../interfaces/generate/file.interface"
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
  metadataBlob: Blob[]
  setMetadataBlob: Dispatch<SetStateAction<Blob[]>>
  assetDimension: AssetDimension
  setAssetDimension: Dispatch<SetStateAction<AssetDimension>>
}

export const GenerateLayerContext = createContext(
  {} as GenerateLayerContextProps
)
const GenerateLayerContextProvider = ({ ...props }) => {
  const [activeStep, setActiveStep] = useState(1)
  const [assets, setAssets] = useState<File[]>([])
  const [layers, setLayers] = useState<LayerData[]>([])
  const [metadata, setMetadata] = useState<LayeredTicketMetadata[]>([])
  const [metadataBlob, setMetadataBlob] = useState<Blob[]>([])
  const [assetDimension, setAssetDimension] = useState<AssetDimension>({
    width: DEFAULT_CANVAS_SIZE,
    height: DEFAULT_CANVAS_SIZE
  })
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
    metadataBlob,
    setMetadataBlob,
    assetDimension,
    setAssetDimension
  }

  return <GenerateLayerContext.Provider value={values} {...props} />
}

export default GenerateLayerContextProvider
