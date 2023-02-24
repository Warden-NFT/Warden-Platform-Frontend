import { Box, IconButton, Typography } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import React, { useRef } from "react"
import { EventTicket } from "../../../dtos/ticket/ticket.dto"
import { TicketTypeLabel } from "../../../interfaces/event/event.interface"
import TicketCard from "./TicketCard"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

type Props = {
  tickets: EventTicket[] | undefined
  ticketType: string
  isHorizontal?: boolean
}

function TicketCardList({ tickets, ticketType, isHorizontal }: Props) {
  const ticketListRef = useRef<HTMLDivElement>(null)

  const scrollList = (amount: number) => {
    if (!ticketListRef.current) return
    ticketListRef.current.scroll({
      left:
        (ticketListRef.current ? ticketListRef.current.scrollLeft : 0) + amount,
      behavior: "smooth"
    })
  }

  if (!tickets) return null
  return (
    <Box
      sx={{
        background: isHorizontal ? deepPurple[100] : "transparent",
        p: 2,
        borderRadius: 2
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="h2">
          {ticketType}
        </Typography>
        {isHorizontal && (
          <Box>
            <IconButton onClick={() => scrollList(-300)} aria-label="delete">
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={() => scrollList(300)} aria-label="delete">
              <ChevronRight />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box sx={{ height: 12 }} />
      {isHorizontal ? (
        <Box
          ref={ticketListRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            pb: 2,
            overflowX: "scroll"
          }}
        >
          {tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              name={ticket.name}
              image={ticket.ticketMetadata[0].image as string}
              ticketTypeLabel={TicketTypeLabel[ticket.ticketType]}
              price={ticket.price?.amount.toString()}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            mt: 2,
            gridTemplateColumns: [
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
              "repeat(5, 1fr)"
            ]
          }}
        >
          {tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              name={ticket.name}
              image={ticket.ticketMetadata[0].image as string}
              ticketTypeLabel={TicketTypeLabel[ticket.ticketType]}
              price={ticket.price?.amount.toString()}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default TicketCardList
