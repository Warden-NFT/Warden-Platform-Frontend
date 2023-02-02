import { Container, Box, Typography } from "@mui/material"
import React, { useState } from "react"
import GenerateModeSelector from "../../components/generate/GenerateModeSelector"
import TicketTypeList from "../../components/generate/TicketTypeList"
import { TicketTypes } from "../../interfaces/ticket/ticket.interface"
import { IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

function GeneratePage() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<TicketTypes | null>(null)

  function handleSelectTicket(type: TicketTypes) {
    setSelectedType(type)
    setStep((prev) => prev + 1)
  }

  function handleBack() {
    setStep(1)
    setSelectedType(null)
  }

  return (
    <Container sx={{ display: "grid", placeItems: "center" }}>
      <Typography variant="h4" fontWeight="800">
        Welcome to NFT ticket generator
      </Typography>

      {step === 1 && (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">
            Select the event ticket type you would like to generate
          </Typography>
          <TicketTypeList handleSelectTicket={handleSelectTicket} />
        </Box>
      )}
      {step === 2 && (
        <Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">
              What mode would you like to use to generate your event ticket
            </Typography>
          </Box>
          <IconButton aria-label="Go back" size="large" onClick={handleBack}>
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
          <GenerateModeSelector selectedType={selectedType} />
        </Box>
      )}
      <Box sx={{ marginTop: 8, textDecoration: "underline" }}>
        <Typography variant="h5">Some documentations</Typography>
      </Box>
    </Container>
  )
}

export default GeneratePage
