import React from 'react'
import CompleteGenerateContainer from '../../../components/generate/complete/CompleteGenerateContainer'
import GenerateCompleteStepProvider from '../../../components/generate/complete/GenerateCompleteStep'

function CompleteGeneratePage() {
      return (
            <GenerateCompleteStepProvider>
                  <CompleteGenerateContainer />
            </GenerateCompleteStepProvider>
      )
}

export default CompleteGeneratePage