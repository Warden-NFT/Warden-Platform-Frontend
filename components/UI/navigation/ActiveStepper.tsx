import { Box, Step, StepLabel, Stepper } from "@mui/material"
import React, { ReactNode } from "react"
import { StepperSteps } from "../../../constants/generate/steps"

interface Props {
  steps: StepperSteps[]
  activeStep: number
  children: ReactNode
}

function ActiveStepper({ steps, activeStep, children }: Props) {
  return (
    <Box>
      <Stepper
        nonLinear
        activeStep={activeStep - 1}
        alternativeLabel
        sx={{
          border: 2,
          borderRadius: 4,
          padding: 2,
          backgroundColor: "white",
          boxShadow: "10px 6px 0 rgba(0, 0, 0, 1)"
        }}
      >
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > step.step}>
            <StepLabel color="inherit">{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>{children}</Box>
    </Box>
  )
}

export default ActiveStepper
