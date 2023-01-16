import React, {
      useState,
      createContext,
      SetStateAction,
      Dispatch,
      useEffect,
} from "react";
import { TicketInfo } from "../../interfaces/generate/collection.interface";
import { UploadedAsset } from "../../interfaces/generate/file.interface";
interface GenerateCompleteContextProps {
      activeStep: number;
      setActiveStep: Dispatch<SetStateAction<number>>;
      assets: File[];
      setAssets: Dispatch<SetStateAction<File[]>>;
      uploadedAssets: UploadedAsset[];
      setUploadedAssets: Dispatch<SetStateAction<UploadedAsset[]>>;
      formInfo: TicketInfo;
      setFormInfo: Dispatch<SetStateAction<TicketInfo>>;
}

export const GenerateCompleteContext = createContext(
      {} as GenerateCompleteContextProps
);
const GenerateCompleteContextProvider = ({ ...props }) => {
      const [activeStep, setActiveStep] = useState(1);
      const [assets, setAssets] = useState<File[]>([]);
      const [uploadedAssets, setUploadedAssets] = useState<UploadedAsset[]>([]);
      const [formInfo, setFormInfo] = useState<TicketInfo>({
            currency: 'ETH',
            name: '',
            description: '',
            subjectOf: '',
            ticketMetadata: {
                  data: []
            },
            price: 0,
            ticketType: 'GENERAL'
      });

      useEffect(() => {
        console.log(uploadedAssets);
  }, [uploadedAssets]);

      const values: GenerateCompleteContextProps = {
            activeStep,
            setActiveStep,
            assets,
            setAssets,
            uploadedAssets,
            setUploadedAssets,
        formInfo,
        setFormInfo,
  };

      return <GenerateCompleteContext.Provider value={values} {...props} />;
};

export default GenerateCompleteContextProvider;
