import { Box, Divider, Step, StepLabel, Stepper, SxProps } from "@mui/material"
import { Theme } from "@mui/system"
import React, { ReactNode } from "react"
import { StepperSteps } from "../../../constants/generate/steps"
import FlatCard from "../card/FlatCard"

interface Props {
  steps: StepperSteps[]
  activeStep: number
  children: ReactNode
  sx?: SxProps<Theme>
}

function ActiveStepper({ steps, activeStep, children, sx }: Props) {
  return (
    <Box>
      <Stepper
        nonLinear
        activeStep={activeStep - 1}
        alternativeLabel
        sx={{
          padding: 2,
          border: 2,
          boxShadow: "10px 6px 0 rgba(0, 0, 0, 1)",
          ...sx
        }}
      >
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > step.step}>
            <StepLabel color="inherit">{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ paddingY: 4 }}>{children}</Box>
    </Box>
  )
}

export default ActiveStepper
