import React, {
      useState,
      createContext,
      SetStateAction,
      Dispatch,
} from "react";
interface GenerateCompleteContextProps {
      activeStep: number;
      setActiveStep: Dispatch<SetStateAction<number>>
}


export const GenerateCompleteContext = createContext({} as GenerateCompleteContextProps);
const GenerateCompleteContextProvider = ({ ...props }) => {
      const [activeStep, setActiveStep] = useState(1)

      const values: GenerateCompleteContextProps = {
            activeStep, setActiveStep
      };



      return <GenerateCompleteContext.Provider value={values} {...props} />;
};

export default GenerateCompleteContextProvider;
