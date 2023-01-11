import { Box, IconButton, Stack, Step, StepLabel, Stepper } from "@mui/material";
import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { StepperSteps } from "../../../constants/generate/steps";
import ContainedButton from "../button/ContainedButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
      steps: StepperSteps[];
      totalStep: number;
      activeStep: number;
      setActiveStep: Dispatch<SetStateAction<number>>;
      children: ReactNode;
      onNext?: () => void;
      onPrevios?: () => void;
}

function ActiveStepper({
      steps,
      totalStep,
      activeStep,
      setActiveStep,
      children,
      onNext,
      onPrevios,
}: Props) {
      function handleNext() {
            if (activeStep > totalStep - 1) {
                  setActiveStep((prev) => prev + 1);
                  onNext?.();
            }
      }

      function handlePrevious() {
            if (activeStep > 1) {
                  setActiveStep((prev) => prev - 1);
                  onPrevios?.();
            }
      }

      return (
            <Box>
                  <Stepper nonLinear activeStep={activeStep - 1} alternativeLabel
                        sx={{ border: 2, borderRadius: 4, padding: 2, backgroundColor: 'white', boxShadow: "10px 6px 0 rgba(0, 0, 0, 1)" }}
                  >
                        {steps.map((step, index) => (
                              <Step key={index} completed={activeStep > step.step}>
                                    <StepLabel color="inherit" >{step.label}</StepLabel>
                              </Step>
                        ))}
                  </Stepper>
                  <Box sx={{ backgroundColor: 'white', marginY: 4, borderRadius: 6, border: 2 }}>
                        {children}
                  </Box>
                  <Stack direction='row' justifyContent='space-between' sx={{ width: "100%" }}>
                        <ContainedButton variant='outlined' label='Back' height="40px" width='200px' />
                        <ContainedButton variant='contained' label='Next' height="40px" width='200px' />
                  </Stack>
            </Box>
      );
}

export default ActiveStepper;
