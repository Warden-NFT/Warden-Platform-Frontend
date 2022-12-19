import React, {
      useState,
      createContext,
      SetStateAction,
      Dispatch,
      useEffect,
} from "react";
import { LayeredAssetData, UploadedAsset } from "../../interfaces/generate/file.interface";
interface GenerateLayerContextProps {
      activeStep: number;
      setActiveStep: Dispatch<SetStateAction<number>>;
      assets: File[];
      setAssets: Dispatch<SetStateAction<File[]>>;
      layeredAssets: LayeredAssetData[];
      setLayeredAssets: Dispatch<SetStateAction<LayeredAssetData[]>>;
}

export const GenerateLayerContext = createContext(
      {} as GenerateLayerContextProps
);
const GenerateLayerContextProvider = ({ ...props }) => {
      const [activeStep, setActiveStep] = useState(1);
      const [assets, setAssets] = useState<File[]>([]);
      const [layeredAssets, setLayeredAssets] = useState<LayeredAssetData[]>([]);

      useEffect(() => {
            console.log(layeredAssets)
      }, [layeredAssets])

      const values: GenerateLayerContextProps = {
            activeStep,
            setActiveStep,
            assets,
            setAssets,
            layeredAssets,
            setLayeredAssets
      };

      return <GenerateLayerContext.Provider value={values} {...props} />;
};

export default GenerateLayerContextProvider;
