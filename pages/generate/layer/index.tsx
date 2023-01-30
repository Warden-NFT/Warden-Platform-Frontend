import React from "react"
import LayeredGenerateContainer from "../../../components/generate/layer/LayeredGenerateContainer"
import GenerateLayerContextProvider from "../../../contexts/generate/GenerateLayerContext"

function LayeredGeneratePage() {
  return (
    <GenerateLayerContextProvider>
      <LayeredGenerateContainer />
    </GenerateLayerContextProvider>
  )
}

export default LayeredGeneratePage
