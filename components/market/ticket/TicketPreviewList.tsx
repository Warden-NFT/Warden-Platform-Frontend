import { Box } from "@mui/material"
import React from "react"
import { TicketTypeLabel } from "../../../interfaces/event/event.interface"
import {
  EventTicketPreviews,
  EventTicketPreviewsType
} from "../../../interfaces/market/marketEvent.interface"
import TicketCard from "./TicketCard"

const ticketPreviewKeys = ["vip", "general", "reservedSeat"]

type Props = {
  eventTicketPreviews: EventTicketPreviews[]
  eventIndex: number
}

function TicketPreviewList({ eventTicketPreviews, eventIndex }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {ticketPreviewKeys.map((_previewKey, previewKeyIndex) => {
        const previewKey = _previewKey as EventTicketPreviewsType
        return (
          <Box key={previewKeyIndex}>
            {eventTicketPreviews[eventIndex]?.tickets[previewKey][0] && (
              <TicketCard
                image={
                  eventTicketPreviews[eventIndex].tickets[previewKey][0]
                    .ticketMetadata[0].image
                }
                name={
                  eventTicketPreviews[eventIndex].tickets[previewKey][0].name
                }
                ticketTypeLabel={TicketTypeLabel[previewKey]}
                price={
                  eventTicketPreviews[eventIndex].ticketPrice[
                    previewKey
                  ]?.default.toString() ?? ""
                }
              />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default TicketPreviewList
