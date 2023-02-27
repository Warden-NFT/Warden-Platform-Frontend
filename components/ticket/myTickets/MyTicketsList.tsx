import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext, useEffect } from "react"
import { MyTicketsContext } from "../../../contexts/ticket/myTicketsContext"
import TicketCardList from "../../market/ticket/TicketCardList"

function MyTicketsList() {
  const { filteredMyTickets, getUserTickets } = useContext(MyTicketsContext)

  useEffect(() => {
    getUserTickets("0x62E2444746aA6aD61478F9cC8d5e70c87691DD98")
  }, [])

  return (
    <Box>
      <Box sx={{ my: 8 }} />
      <Typography variant="h5">My Tickets</Typography>
      <TicketCardList tickets={filteredMyTickets?.myTickets} />
      <Box sx={{ my: 4 }} />
      <Typography variant="h5">My Listing</Typography>
      <TicketCardList tickets={filteredMyTickets?.myTicketListing} />
    </Box>
  )
}

export default MyTicketsList
