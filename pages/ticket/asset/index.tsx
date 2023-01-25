import React from "react"
import CompleteGenerateContainer from "../../../components/generate/complete/CompleteGenerateContainer"
import GenerateCompleteContextProvider from "../../../contexts/generate/GenerateCompleteContext"

function CompleteGeneratePage() {
  return (
    <GenerateCompleteContextProvider>
      <CompleteGenerateContainer />
    </GenerateCompleteContextProvider>
  )
}

export default CompleteGeneratePage
