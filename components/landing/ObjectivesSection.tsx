import { Box, Typography } from "@mui/material"
import React from "react"
import ContainerCard from "../UI/card/ContainerCard"

function ObjectivesSection() {
  return (
    <Box sx={{ maxWidth: "1200px" }}>
      <Typography variant="h4" component="h4">
        Our Objectives
      </Typography>
      <Box sx={{ height: 24 }} />
      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <ContainerCard>
          <>
            <Typography variant="h6" fontWeight="bold">
              Authenticity of tickets
            </Typography>
            <Typography>Authenticity of tickets</Typography>
            <Typography>Transparency in the system</Typography>
          </>
        </ContainerCard>
        <ContainerCard>
          <>
            <Typography variant="h6" fontWeight="bold">
              Bot Reduction
            </Typography>
            <Typography>
              Limit tickets per person with Smart Contract
            </Typography>
            <Typography>Identity Binding</Typography>
          </>
        </ContainerCard>
        <ContainerCard>
          <>
            <Typography variant="h6" fontWeight="bold">
              Marketplace Control
            </Typography>
            <Typography>Native Secondary Market</Typography>
            <Typography>Transactions regulated with Smart Contract</Typography>
          </>
        </ContainerCard>
      </Box>
      <Box sx={{ height: 20 }} />
      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <ContainerCard>
          <>
            <Typography variant="h6" fontWeight="bold">
              Redistribute Income
            </Typography>
            <Typography>
              Event Organizers earn the royalty fee from ticket resales
            </Typography>
          </>
        </ContainerCard>
        <ContainerCard>
          <>
            <Typography variant="h6" fontWeight="bold">
              Utilizing Tickets
            </Typography>
            <Typography>View tickets and their transaction history</Typography>
            <Typography>Tickets for event admisison</Typography>
          </>
        </ContainerCard>
        <ContainerCard>
          <>
            <Typography variant="h6" fontWeight="bold">
              User-friendliness
            </Typography>
            <Typography>User-friendly for beginner and expert users</Typography>
          </>
        </ContainerCard>
      </Box>
    </Box>
  )
}

export default ObjectivesSection
