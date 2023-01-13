import { Box, Container } from "@mui/material";
import React, { useContext, useState } from "react";
import { COMPLETE_MODE_STEPS } from "../../../constants/generate/steps";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";
import ActiveStepper from "../../UI/navigation/ActiveStepper";
import CompleteDropzone from "./CompleteDropzone";
import CompleteForm from "./CompleteForm";
import CompleteStepper from "./CompleteStepper";

function CompleteGenerateContainer() {
      const { activeStep, setActiveStep } = useContext(GenerateCompleteContext);

      return (
            <ActiveStepper
                  steps={COMPLETE_MODE_STEPS}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
            >
                  {activeStep === 1 && <CompleteDropzone />}
                  {activeStep === 2 && <CompleteForm />}
                  {/* {activeStep === 3 && } */}
            </ActiveStepper>
      );
}

export default CompleteGenerateContainer;
