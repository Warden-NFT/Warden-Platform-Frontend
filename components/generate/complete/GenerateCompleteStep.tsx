import React, {
      useState,
      createContext,
      SetStateAction,
      Dispatch,
} from "react";
interface GenerateCompleteStepProps {
      activeStep: number;
      setActiveStep: Dispatch<SetStateAction<number>>
}


export const GenerateCompleteStep = createContext({} as GenerateCompleteStepProps);
const GenerateCompleteStepProvider = ({ ...props }) => {
      const [activeStep, setActiveStep] = useState(0)

      const values: GenerateCompleteStepProps = {
            activeStep, setActiveStep
      };



      return <GenerateCompleteStep.Provider value={values} {...props} />;
};

export default GenerateCompleteStepProvider;
