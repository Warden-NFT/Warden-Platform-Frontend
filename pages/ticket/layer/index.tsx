import { Container } from "@mui/material"
import Head from "next/head"
import React from "react"
import LayeredGenerateContainer from "../../../components/generate/layer/LayeredGenerateContainer"
import GenerateLayerContextProvider from "../../../contexts/generate/GenerateLayerContext"

function LayeredGeneratePage() {
  return (
    <GenerateLayerContextProvider>
      <Head>
        <title>Create Ticket - Layers</title>
      </Head>
      <Container>
        <LayeredGenerateContainer />
      </Container>
    </GenerateLayerContextProvider>
  )
}

export default LayeredGeneratePage
