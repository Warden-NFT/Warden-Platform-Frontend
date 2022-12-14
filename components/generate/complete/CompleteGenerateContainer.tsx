import React, { useContext } from 'react'
import { GenerateCompleteContext } from '../../../contexts/generate/GenerateCompleteContext'
import CompleteDropzone from './CompleteDropzone'
import CompleteStepper from './CompleteStepper'

function CompleteGenerateContainer() {
      const { activeStep } = useContext(GenerateCompleteContext)
      return (
            <CompleteStepper>
                  {activeStep === 1 && <CompleteDropzone />}
            </CompleteStepper>
      )
}

export default CompleteGenerateContainer