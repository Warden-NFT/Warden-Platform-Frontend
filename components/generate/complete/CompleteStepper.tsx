import { Box, Container, Step, StepLabel, Stepper } from '@mui/material'
import React, { useContext } from 'react'
import { COMPLETE_MODE_STEPS } from '../../../constants/generate/steps'
import { GenerateCompleteContext } from '../../../contexts/generate/GenerateCompleteContext'

function CompleteStepper({ children }: { children: React.ReactNode }) {
      const { activeStep } = useContext(GenerateCompleteContext)
      React.useEffect(() => {
            console.log(activeStep)
      }, [activeStep])
      return (

            <Container sx={{ display: 'grid', placeItems: 'center' }}>
                  <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, width: '100%' }}>
                        {COMPLETE_MODE_STEPS.map((step, i) => (
                              <Step key={i}>
                                    <StepLabel>{step.header}</StepLabel>
                              </Step>
                        ))}
                  </Stepper>
                  <Box sx={{ bgColor: 'white', borderRadius: 3, boxShadow: 2, width: '100%' }}>
                  {children}
                  </Box>
            </Container>

      )
}

export default CompleteStepper