import React, { useState, createContext, SetStateAction, Dispatch } from 'react'
import { LayeredAssetInfo } from '../../interfaces/generate/collection.interface'
import { LayeredAssetMetadata } from '../../interfaces/generate/metadata.interface'

interface GenerateLayerContextProps {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  assets: File[]
  setAssets: Dispatch<SetStateAction<File[]>>
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
  const [metadata, setMetadata] = useState<LayeredAssetMetadata[]>([])
  const [formInfo, setFormInfo] = useState<LayeredAssetInfo>({
    currency: 'ETH',
    name: '',
    description: '',
    subjectOf: '',
    ticketMetadata: { data: [] },
    price: 0,
    ticketType: 'GENERAL',
    generationAmount: 1
  })

  const values: GenerateLayerContextProps = {
    activeStep,
    setActiveStep,
    assets,
    setAssets,
    metadata,
    setMetadata,
    formInfo,
    setFormInfo
  }

  return <GenerateLayerContext.Provider value={values} {...props} />
}

export default GenerateLayerContextProvider
