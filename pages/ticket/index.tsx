import { Container, Box, Typography } from "@mui/material"
import React from "react"
import GenerateModeSelector from "../../components/generate/GenerateModeSelector"
import { useAuthAccount } from "../../hooks/useAuthAccount"
import Head from "next/head"

function GeneratePage() {
  useAuthAccount()

  return (
    <Container sx={{ display: "grid", placeItems: "center" }}>
      <Head>
        <title>Create a Ticket</title>
      </Head>
      <GenerateModeSelector />
    </Container>
  )
}

export default GeneratePage
