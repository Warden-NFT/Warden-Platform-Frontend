import React, { useContext } from 'react'
import { Container } from '@mui/material'
import GenerateStepper from './GenerateStepper'
import { GenerateContext } from '../../contexts/GenerateContext'
import GenerateStepOne from './steps/GenerateStepOne'

function GenerateMainUI() {

      const { activeStep } = useContext(GenerateContext)

      return (
            <Container sx={{ display: 'grid', placeItems: 'center' }}>
                  <GenerateStepper>
                        {activeStep === 1 && <GenerateStepOne />}
                        {activeStep === 2 && <div>Step2</div>}
                        {activeStep === 3 && <div>Step3</div>}
                        {/* <GenerateStepComplete /> */}

                  </GenerateStepper>
            </Container>
      )
}

export default GenerateMainUI