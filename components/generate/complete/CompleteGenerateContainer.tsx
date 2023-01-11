import { Box, Container } from "@mui/material";
import React, { useContext, useState } from "react";
import { COMPLETE_MODE_STEPS } from "../../../constants/generate/steps";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";
import ActiveStepper from "../../UI/navigation/ActiveStepper";
import CompleteDropzone from "./CompleteDropzone";
import CompleteForm from "./CompleteForm";
import CompleteStepper from "./CompleteStepper";

function CompleteGenerateContainer() {
      // const { activeStep } = useContext(GenerateCompleteContext);
      const [activeStep, setActiveStep] = useState(1);



      return (
            <ActiveStepper
                  steps={COMPLETE_MODE_STEPS}
                  totalStep={3}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
            >
                  {activeStep === 1 && <CompleteDropzone />}
                  {activeStep === 2 && <CompleteForm />}
            </ActiveStepper>
      );
}

export default CompleteGenerateContainer;
