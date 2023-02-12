import { Container, Box, Typography } from "@mui/material"
import React from "react"
import GenerateModeSelector from "../../components/generate/GenerateModeSelector"

function GeneratePage() {
  return (
    <Container sx={{ display: "grid", placeItems: "center" }}>
      <Typography variant="h4" fontWeight="800">
        Welcome to NFT ticket generator
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">
          What mode would you like to use to generate your event ticket
        </Typography>
      </Box>
      <GenerateModeSelector />
      <Box sx={{ marginTop: 8, textDecoration: "underline" }}>
        <Typography variant="h5">Some documentations</Typography>
      </Box>
    </Container>
  )
}

export default GeneratePage
