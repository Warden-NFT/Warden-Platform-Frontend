import { Container } from "@mui/material"
import Head from "next/head"
import React from "react"
import CompleteGenerateContainer from "../../../components/generate/complete/CompleteGenerateContainer"
import GenerateCompleteContextProvider from "../../../contexts/generate/GenerateCompleteContext"
import { withEventOrganizerGuard } from "../../../guards/withAuth"

function CompleteGeneratePage() {
  return (
    <GenerateCompleteContextProvider>
      <Head>
        <title>Create Ticket - Assets</title>
      </Head>
      <Container>
        <CompleteGenerateContainer />
      </Container>
    </GenerateCompleteContextProvider>
  )
}

export default withEventOrganizerGuard(CompleteGeneratePage)
