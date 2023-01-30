import { Container } from "@mui/material"
import React from "react"
import CompleteGenerateContainer from "../../../components/generate/complete/CompleteGenerateContainer"
import GenerateCompleteContextProvider from "../../../contexts/generate/GenerateCompleteContext"

function CompleteGeneratePage() {
  return (
    <GenerateCompleteContextProvider>
      <Container>
        <CompleteGenerateContainer />
      </Container>
    </GenerateCompleteContextProvider>
  )
}

export default CompleteGeneratePage
