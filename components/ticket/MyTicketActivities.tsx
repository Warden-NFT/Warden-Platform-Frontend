import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import ContainerCard from "../UI/card/ContainerCard"

function MyTicketActivities() {
  return (
    <Box>
      <Box sx={{ my: 8 }} />
      <Typography variant="h5">Activities</Typography>
      <Box sx={{ my: 2 }} />
      <ContainerCard>
        <Typography>Coming soon</Typography>
      </ContainerCard>
    </Box>
  )
}

export default MyTicketActivities
