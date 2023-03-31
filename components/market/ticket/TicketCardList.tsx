import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import React, { useRef, useState } from "react"
import { EventTicket } from "../../../dtos/ticket/ticket.dto"
import { TicketTypeLabel } from "../../../interfaces/event/event.interface"
import TicketCard from "./TicketCard"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

type Props = {
  tickets: EventTicket[] | undefined
  ticketType?: string
  isVip?: boolean
}

function TicketCardList({ tickets, ticketType, isVip }: Props) {
  const ticketListRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  if (!tickets || tickets.length === 0) return null
  return (
    <Box
      sx={{
        borderRadius: 2,
        position: "relative",
        padding: 0,
        mt: 2
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="h2">
          {ticketType}
        </Typography>
      </Box>
      <Box sx={{ height: 12 }} />
      <Box
        className="ticket-list"
        ref={ticketListRef}
        sx={{
          display: "grid",
          gap: 3,
          mt: 2,
          gridTemplateColumns: [
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)"
          ]
        }}
      >
        {tickets.slice((page - 1) * 4, page * 4).map((ticket, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <TicketCard
              ticketId={ticket._id}
              name={ticket.name}
              image={ticket.ticketMetadata[0].image as string}
              ticketTypeLabel={TicketTypeLabel[ticket.ticketType]}
              price={ticket.price?.amount.toString()}
              enableRedirect
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(tickets.length / 4)}
          page={page}
          onChange={handleChange}
          sx={{ mt: 4 }}
        />
      </Box>
    </Box>
  )
}

export default TicketCardList
