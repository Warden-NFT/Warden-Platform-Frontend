import React, { useContext } from 'react'
import { Box, Stepper, Step, StepLabel, Typography, Button, Divider } from '@mui/material'
import { GenerateContext } from '../../contexts/GenerateContext'
import { MAX_GENERATE_STEP, STEPS } from '../../constants/generate/steps'

interface Props {
      children: React.ReactNode
}

function GenerateStepper({ children }: Props) {
      const { activeStep, setActiveStep } = useContext(GenerateContext)

      function handleNext() {
            if (activeStep < MAX_GENERATE_STEP) {
                  setActiveStep(prev => prev + 1)
            }
      }

      function handleBack() {
            if (activeStep > 1) {
                  setActiveStep(prev => prev - 1)
            }
      }

      return (
            <Box sx={{ width: '825px' }}>
                  <Box sx={{ mb: 4, backgroundColor: 'white', py: 3, borderRadius: 3 }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                              {STEPS.map((step, index) => {
                                    return (
                                          <Step key={index}>
                                                <StepLabel>{step.label}</StepLabel>
                                          </Step>
                                    );
                              })}
                        </Stepper>

                  </Box>
                  <main>
                        {children}
                  </main>
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', my: 6 }}>
                        <Button
                              variant='outlined'
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                        >
                              Back
                        </Button>

                        <Button variant='contained' onClick={handleNext}>
                              {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                  </Box>

            </Box>
      )
}

export default GenerateStepper