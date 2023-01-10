import { Box, Container } from "@mui/material";
import React, { useContext } from "react";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";
import CompleteDropzone from "./CompleteDropzone";
import CompleteForm from "./CompleteForm";
import CompleteStepper from "./CompleteStepper";

function CompleteGenerateContainer() {
      const { activeStep } = useContext(GenerateCompleteContext);

      return (
            <CompleteStepper>
                  {activeStep === 1 && <CompleteDropzone />}
                  {activeStep === 2 && <CompleteForm />}
            </CompleteStepper>
      );
}

export default CompleteGenerateContainer;
