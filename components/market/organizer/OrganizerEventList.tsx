import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import React from "react"
import { Event } from "../../../interfaces/event/event.interface"
import { EventTicketPreviews } from "../../../interfaces/market/marketEvent.interface"
import ContainedButton from "../../UI/button/ContainedButton"
import { ImageWithFallback } from "../../UI/image/ImageWithFallback"
import CardSkeleton from "../../UI/skeleton/CardSkeleton"
import TicketPreviewList from "../ticket/TicketPreviewList"

type Props = {
  events: Event[] | undefined
  eventTicketPreviews: EventTicketPreviews[] | undefined
}

function OrganizerEventList({ events, eventTicketPreviews }: Props) {
  return (
    <>
      {(events?.length === 0 || eventTicketPreviews?.length === 0) && (
        <Typography>No matching events</Typography>
      )}
      {!events || !eventTicketPreviews ? (
        <CardSkeleton />
      ) : (
        <>
          {events.map((event, index) => (
            <Box
              key={index}
              sx={{
                border: "2px solid #000",
                height: "490px",
                mb: 4,
                borderRadius: 1,
                p: 2,
                position: "relative"
              }}
            >
              <Box>
                <ImageWithFallback
                  src={event.image as string}
                  width={1200}
                  height={300}
                  alt={event.name}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    filter: "brightness(0.6)"
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  p: 2,
                  width: "calc(100% - 64px)",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  {event.name}
                </Typography>
                <ContainedButton label="View all tickets" variant="contained" />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 72,
                  left: 32
                }}
              >
                <Typography sx={{ color: "#fff" }}>{`${moment(
                  event.startDate
                ).format("lll")}`}</Typography>
                <Box sx={{ height: 12 }} />
                <TicketPreviewList
                  eventTicketPreviews={eventTicketPreviews}
                  eventIndex={index}
                />
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  )
}

export default OrganizerEventList
