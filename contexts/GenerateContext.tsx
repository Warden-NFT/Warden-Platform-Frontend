import React, {
      useState,
      createContext,
      SetStateAction,
      Dispatch,
      useEffect,
} from "react";

interface GenerateContextProps {
      activeStep: number;
      setActiveStep: Dispatch<SetStateAction<number>>
}

export const GenerateContext = createContext({} as GenerateContextProps);

const GenerateContextProvider = ({ ...props }) => {

      const [activeStep, setActiveStep] = useState(1)

      const values: GenerateContextProps = {
            activeStep, setActiveStep
      };



      return <GenerateContext.Provider value={values} {...props} />;
};

export default GenerateContextProvider;
