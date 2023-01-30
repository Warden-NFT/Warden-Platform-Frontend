import { Container } from "@mui/material"
import React from "react"
import LayeredGenerateContainer from "../../../components/generate/layer/LayeredGenerateContainer"
import GenerateLayerContextProvider from "../../../contexts/generate/GenerateLayerContext"

function LayeredGeneratePage() {
  return (
    <GenerateLayerContextProvider>
      <Container>
        <LayeredGenerateContainer />
      </Container>
    </GenerateLayerContextProvider>
  )
}

export default LayeredGeneratePage
