import React, { useContext } from 'react'
import { Box, Stepper, Step, StepLabel, Typography, Button } from '@mui/material'
import { GenerateContext } from '../../contexts/GenerateContext'
import { MAX_GENERATE_STEP } from '../../constants/generate'
import GenerateStepComplete from './GenerateStepComplete'

const STEPS = [
      {
            label: "Collection",
            description: 'General information about your NFT collection'
      },
      { label: 'Upload', description: 'View and edit the layer images' },
      { label: 'Customize', description: 'Set up your layer occurance rate in the details menu or reorder the layers by dragging them' }
]

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
                  <Stepper activeStep={activeStep}>
                        {STEPS.map((step, index) => {
                              return (
                                    <Step key={index}>
                                          <StepLabel>{step.label}</StepLabel>
                                    </Step>
                              );
                        })}
                  </Stepper>
                  <main>
                        {children}
                  </main>
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
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