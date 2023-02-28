import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext, useEffect } from "react"
import { useAccount } from "wagmi"
import { MyTicketsContext } from "../../../contexts/ticket/myTicketsContext"
import TicketCardList from "../../market/ticket/TicketCardList"

function MyTicketsList() {
  const { filteredMyTickets, getUserTickets } = useContext(MyTicketsContext)
  const { address } = useAccount()

  useEffect(() => {
    if (!address) return
    getUserTickets(address)
  }, [address])

  return (
    <Box>
      <Box sx={{ my: 4 }} />
      <Typography variant="h5">My Tickets</Typography>
      <TicketCardList tickets={filteredMyTickets?.myTickets} />
      <Box sx={{ my: 4 }} />
      <Typography variant="h5">My Listing</Typography>
      <TicketCardList tickets={filteredMyTickets?.myTicketListing} />
    </Box>
  )
}

export default MyTicketsList
