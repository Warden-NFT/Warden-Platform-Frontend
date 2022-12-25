import {
      Box,
      Button,
      Container,
      IconButton,
      Stack,
      Step,
      StepLabel,
      Stepper,
      Tooltip,
      Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { LAYERED_MODE_STEPPER } from "../../../constants/generate/steps";
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function LayerStepper({ children }: { children: React.ReactNode }) {
      const { activeStep, setActiveStep, assets, layeredAssets } =
            useContext(GenerateLayerContext);

      function handleNext() {
            if (activeStep === 1) {
                  if (assets.length > 0 && layeredAssets.length > 0) setActiveStep(2);
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
            <Container sx={{ display: "grid", placeItems: "center" }}>
                  <Box sx={{ diplay: "flex" }}>
                        <Stack
                              direction="row"
                              sx={{ border: 1, borderColor: "#e0e0e0", borderRadius: 3 }}
                        >
                              <Box
                                    sx={{
                                          display: "grid",
                                          placeItems: "center",
                                          borderRight: 1,
                                          borderColor: "#e0e0e0",
                                          backgroundColor: '#efefef'
                                    }}
                              >
                                    <Tooltip title="Exit">
                                          <IconButton aria-label="Exit Generation">
                                                <ArrowBackIcon />
                                          </IconButton>
                                    </Tooltip>
                              </Box>
                              {LAYERED_MODE_STEPPER.map((step, index) => (
                                    <Box
                                          sx={[
                                                { minWidth: "190px", p: 2 },
                                                index < LAYERED_MODE_STEPPER.length - 1 && {
                                                      borderRight: 1,
                                                      borderColor: "#e0e0e0",
                                                },
                                          ]}
                                    >
                                          <Stack direction="row">
                                                <Box mr="4px">
                                                      {activeStep > step.step && (
                                                            <CheckCircleIcon color="success" />
                                                      )}
                                                </Box>
                                                <Typography fontSize={16} fontWeight="600">
                                                      {index + 1}. {step.header}
                                                </Typography>
                                          </Stack>
                                          <Typography sx={{ ml: 3 }} fontSize={12}>{step.label}</Typography>
                                    </Box>
                              ))}
                        </Stack>
                  </Box>


                  <Box
                        sx={{
                              width: [600, 800, 1000],
                              my: 4,
                              p: 2,
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

export default LayerStepper;
