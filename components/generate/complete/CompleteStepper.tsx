import {
      Box,
      Button,
      Container,
      Stack,
      Step,
      StepLabel,
      Stepper,
      Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { COMPLETE_MODE_STEPS } from "../../../constants/generate/steps";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";

function CompleteStepper({ children }: { children: React.ReactNode }) {
      const { activeStep, setActiveStep, assets, uploadedAssets } = useContext(
            GenerateCompleteContext
      );

      function handleNext() {
            if (activeStep === 1) {
                  if (assets.length > 0 && uploadedAssets.length > 0) setActiveStep(2);
            } else if (activeStep < 3) {
                  setActiveStep((prev) => prev + 1);
            }
      }

      function handleBack() {
            if (activeStep > 1) {
                  setActiveStep((prev) => prev - 1);
            }
      }

      return (
            <Container maxWidth="md" sx={{ display: "grid", placeItems: "center" }}>
                  <Box
                        sx={{ backgroundColor: "white", borderRadius: 3, py: 2, width: "100%" }}
                  >
                        <Stepper nonLinear activeStep={activeStep - 1} alternativeLabel>
                              {COMPLETE_MODE_STEPS.map((step, index) => (
                                    <Step key={index} completed={activeStep > step.step}>
                                          <StepLabel color="inherit">{step.label}</StepLabel>
                                    </Step>
                              ))}
                        </Stepper>
                  </Box>

                  <Box
                        sx={{
                              backgroundColor: "white",
                              borderRadius: 3,
                              boxShadow: 2,
                              width: [400, 600, 800],
                              my: 4,
                        }}
                  >
                        {children}
                  </Box>

                  <Stack width="100%" direction="row" justifyContent="space-around">
                        <Button
                              onClick={handleBack}
                              variant="outlined"
                              disabled={activeStep > 1 ? false : true}
                        >
                              Back
                        </Button>
                        <Button onClick={handleNext} variant="contained">
                              {activeStep === 3 ? "Finish" : "Next"}
                        </Button>
                  </Stack>
            </Container>
      );
}

export default CompleteStepper;
