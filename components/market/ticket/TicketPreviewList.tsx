import { Box } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import {
  Event,
  TicketTypeLabel
} from "../../../interfaces/event/event.interface"
import {
  EventTicketPreviews,
  EventTicketPreviewsType
} from "../../../interfaces/market/marketEvent.interface"
import TicketCard from "./TicketCard"

const ticketPreviewKeys = ["vip", "general", "reservedSeat"]

type Props = {
  eventTicketPreviews: EventTicketPreviews[]
  eventIndex: number
  event: Event
}

function TicketPreviewList({ eventTicketPreviews, eventIndex, event }: Props) {
  const router = useRouter()
  const { organizerId } = router.query
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {ticketPreviewKeys.map((_previewKey, previewKeyIndex) => {
        const previewKey = _previewKey as EventTicketPreviewsType
        return (
          <Box key={previewKeyIndex}>
            {eventTicketPreviews[eventIndex]?.tickets[previewKey][0] && (
              <Box
                onClick={() =>
                  router.push(
                    `/marketplace/${organizerId}/${event._id}/${eventTicketPreviews[eventIndex].tickets[previewKey][0]._id}`
                  )
                }
              >
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
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default TicketPreviewList
