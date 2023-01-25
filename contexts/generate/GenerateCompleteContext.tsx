import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  useEffect
} from "react"
import { TicketInfo } from "../../interfaces/generate/collection.interface"
import { UploadedCompleteAsset } from "../../interfaces/generate/file.interface"
interface GenerateCompleteContextProps {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  assets: File[]
  setAssets: Dispatch<SetStateAction<File[]>>
  uploadedAssets: UploadedCompleteAsset[]
  setUploadedAssets: Dispatch<SetStateAction<UploadedCompleteAsset[]>>
  vipAssets: File[]
  setVipAssets: Dispatch<SetStateAction<File[]>>
  uploadedVipAssets: UploadedCompleteAsset[]
  setUploadedVipAssets: Dispatch<SetStateAction<UploadedCompleteAsset[]>>
  formInfo: TicketInfo
  setFormInfo: Dispatch<SetStateAction<TicketInfo>>
}

export const GenerateCompleteContext = createContext(
  {} as GenerateCompleteContextProps
)
const GenerateCompleteContextProvider = ({ ...props }) => {
  const [activeStep, setActiveStep] = useState(1)
  const [assets, setAssets] = useState<File[]>([])
  const [vipAssets, setVipAssets] = useState<File[]>([])
  const [uploadedAssets, setUploadedAssets] = useState<UploadedCompleteAsset[]>(
    []
  )
  const [uploadedVipAssets, setUploadedVipAssets] = useState<
    UploadedCompleteAsset[]
  >([])
  const [formInfo, setFormInfo] = useState<TicketInfo>({
    currency: "ETH",
    name: "",
    description: "",
    subjectOf: "",
    ticketMetadata: {
      data: []
    },
    price: 0,
    ticketType: "GENERAL"
  })

  useEffect(() => {
    console.log(uploadedAssets)
  }, [uploadedAssets])

  const values: GenerateCompleteContextProps = {
    activeStep,
    setActiveStep,
    assets,
    setAssets,
    uploadedAssets,
    setUploadedAssets,
    vipAssets,
    setVipAssets,
    uploadedVipAssets,
    setUploadedVipAssets,
    formInfo,
    setFormInfo
  }

  return <GenerateCompleteContext.Provider value={values} {...props} />
}

export default GenerateCompleteContextProvider
