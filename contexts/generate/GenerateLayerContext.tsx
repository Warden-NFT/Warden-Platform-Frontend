import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  useEffect
} from 'react'
// import { LayeredCollectionInfo } from "../../interfaces/generate/collection.interface";
import { LayeredAssetData } from '../../interfaces/generate/file.interface'
import { AssetMetadata } from '../../interfaces/generate/metadata.interface'
interface GenerateLayerContextProps {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  assets: File[]
  setAssets: Dispatch<SetStateAction<File[]>>
  layeredAssets: LayeredAssetData[]
  setLayeredAssets: Dispatch<SetStateAction<LayeredAssetData[]>>
  collectionInfo: LayeredCollectionInfo | null
  setCollectionInfo: Dispatch<SetStateAction<LayeredCollectionInfo | null>>
  assetMetadata: AssetMetadata[]
  setAssetMetadata: Dispatch<SetStateAction<AssetMetadata[]>>
}

export const GenerateLayerContext = createContext(
  {} as GenerateLayerContextProps
)
const GenerateLayerContextProvider = ({ ...props }) => {
  const [activeStep, setActiveStep] = useState(1)
  const [assets, setAssets] = useState<File[]>([])
  const [layeredAssets, setLayeredAssets] = useState<LayeredAssetData[]>([])
  const [collectionInfo, setCollectionInfo] =
    useState<LayeredCollectionInfo | null>(null)
  const [assetMetadata, setAssetMetadata] = useState<AssetMetadata[]>([])

  useEffect(() => {
    console.log(layeredAssets)
  }, [layeredAssets])

  const values: GenerateLayerContextProps = {
    activeStep,
    setActiveStep,
    assets,
    setAssets,
    layeredAssets,
    setLayeredAssets,
    collectionInfo,
    setCollectionInfo,
    assetMetadata,
    setAssetMetadata
  }

  return <GenerateLayerContext.Provider value={values} {...props} />
}

export default GenerateLayerContextProvider
