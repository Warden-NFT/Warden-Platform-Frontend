import { ButtonBase, Chip, Divider, Skeleton, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { Box } from "@mui/system"
import React from "react"
import {
  Event,
  TicketTypeLabel
} from "../../../interfaces/event/event.interface"
import {
  EventTicketPreviews,
  EventTicketPreviewsType
} from "../../../interfaces/market/marketEvent.interface"
import ContainedButton from "../../UI/button/ContainedButton"
import ContainerCard from "../../UI/card/ContainerCard"
import { ImageWithFallback } from "../../UI/image/ImageWithFallback"

type Props = {
  events: Event[] | undefined
  eventTicketPreviews: EventTicketPreviews[] | undefined
}

function OrganizerEventList({ events, eventTicketPreviews }: Props) {
  const ticketPreviewKeys = [
    "vipTickets",
    "generalTickets",
    "reservedSeatTickets"
  ]

  return (
    <>
      {(events?.length === 0 || eventTicketPreviews?.length === 0) && (
        <Typography>No matching events</Typography>
      )}
      {!events || !eventTicketPreviews ? (
        <>
          <Skeleton variant="rectangular" height={140} />
          <Box sx={{ p: 2 }}>
            <Skeleton height={40} />
            <Skeleton width="60%" />
            <Skeleton width="60%" />
            <Skeleton width="60%" />
          </Box>
        </>
      ) : (
        <>
          {events.map((event, index) => (
            <Box
              key={index}
              sx={{
                border: "2px solid #000",
                height: "450px",
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
                  top: 88,
                  left: 32,
                  display: "flex",
                  gap: 2
                }}
              >
                {ticketPreviewKeys.map((_previewKey, previewKeyIndex) => {
                  const previewKey = _previewKey as EventTicketPreviewsType
                  return (
                    <Box key={previewKeyIndex}>
                      {eventTicketPreviews[index]?.tickets[previewKey][0] && (
                        <ButtonBase>
                          <ContainerCard
                            sx={{
                              p: 1,
                              width: 200,
                              borderRadius: 1,
                              textAlign: "start"
                            }}
                          >
                            <ImageWithFallback
                              src={
                                eventTicketPreviews[index].tickets[
                                  previewKey
                                ][0].ticketMetadata[0].image
                              }
                              width={200}
                              height={200}
                              alt={
                                eventTicketPreviews[index].tickets[
                                  previewKey
                                ][0].name
                              }
                              style={{
                                objectFit: "cover",
                                borderRadius: "4px"
                              }}
                            />
                            <Typography
                              sx={{ fontWeight: 500, lineHeight: 1.25 }}
                            >
                              {
                                eventTicketPreviews[index].tickets[
                                  previewKey
                                ][0].name
                              }
                            </Typography>
                            <Box sx={{ height: 8 }} />
                            <Typography sx={{ fontSize: 11, fontWeight: 300 }}>
                              {
                                eventTicketPreviews[index].tickets[
                                  previewKey
                                ][0].name
                              }
                            </Typography>
                            <Box sx={{ height: 8 }} />
                            <Chip label={TicketTypeLabel[previewKey]} />
                            <Divider
                              sx={{ borderColor: "#000", mx: -1, my: 2 }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5
                              }}
                            >
                              <ImageWithFallback
                                src="/images/crypto/eth.svg"
                                width={20}
                                height={20}
                                alt="Ethereum"
                              />
                              <Typography sx={{ fontWeight: 600 }}>
                                {
                                  // @ts-ignore
                                  eventTicketPreviews[index].ticketPrice[
                                    previewKey.split("Tickets")[0]
                                  ].default
                                }
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  color: grey[600]
                                }}
                              >
                                eth
                              </Typography>
                            </Box>
                          </ContainerCard>
                        </ButtonBase>
                      )}
                    </Box>
                  )
                })}
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  )
}

export default OrganizerEventList
