import { Container, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import { COMPLETE_MODE_STEPS } from '../../../constants/generate/steps'

function CompleteStepper({ children }: { children: React.ReactNode }) {
      return (

            <Container sx={{ display: 'grid', placeItems: 'center' }}>
                  <Stepper activeStep={1} alternativeLabel>
                        {COMPLETE_MODE_STEPS.map((step, i) => (
                              <Step key={i}>
                                    <StepLabel>{step.header}</StepLabel>
                              </Step>
                        ))}
                  </Stepper>
                  {children}
            </Container>

      )
}

export default CompleteStepper