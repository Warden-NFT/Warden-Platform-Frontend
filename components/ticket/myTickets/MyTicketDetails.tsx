import { Launch } from "@mui/icons-material"
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography
} from "@mui/material"
import moment from "moment"
import Link from "next/link"
import React from "react"
import { TicketTypeLabel } from "../../../interfaces/event/event.interface"
import { TicketListing } from "../../../interfaces/market/marketEvent.interface"
import ContainedButton from "../../UI/button/ContainedButton"
import FlatCard from "../../UI/card/FlatCard"

type Props = {
  ticketListing: TicketListing | undefined
}

function MyTicketDetails({ ticketListing }: Props) {
  if (!ticketListing) return <CircularProgress />
  return (
    <FlatCard
      sx={{
        my: 0,
        borderRadius: 1,
        width: "100%"
      }}
    >
      <Stack
        justifyContent="space-between"
        sx={{
          display: "flex",
          alignItems: "stretch"
        }}
      >
        <Box
          sx={{
            height: 458
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Ticket Details
          </Typography>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography sx={{ opacity: 0.4, width: 160 }}>
                Ticket name
              </Typography>
            </Box>
            <Box>
              <Typography>{ticketListing?.ticket.name}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography sx={{ opacity: 0.4, width: 160 }}>
                Description
              </Typography>
            </Box>
            <Box>
              <Typography>{ticketListing?.ticket.description}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography sx={{ opacity: 0.4, width: 160 }}>Type</Typography>
            </Box>
            <Box>
              <Typography>
                {TicketTypeLabel[ticketListing?.ticket.ticketType ?? "GENERAL"]}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ my: 4 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Event Details
          </Typography>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography sx={{ opacity: 0.4, width: 160 }}>
                Event Date
              </Typography>
            </Box>
            <Box>
              <Typography>
                {`${moment(ticketListing?.event.startDate).format(
                  "lll"
                )} - ${moment(ticketListing?.event.endDate).format("lll")}`}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography sx={{ opacity: 0.4, width: 160 }}>
                Event Doortime
              </Typography>
            </Box>
            <Box>
              <Typography>
                {moment(ticketListing?.event.doorTime).format("lll")}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography sx={{ opacity: 0.4, width: 160 }}>
                Event Location
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box>
                {ticketListing?.event.location ? (
                  <Link
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                    href={`https://www.google.com/maps/place/?q=place_id:${ticketListing?.event.location.place_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography>
                      {
                        ticketListing.event.location.structured_formatting
                          .main_text
                      }
                    </Typography>
                    <Launch sx={{ fontSize: 16 }} />
                  </Link>
                ) : (
                  <Link
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                    href={ticketListing?.event.online_url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography>{ticketListing?.event.online_url}</Typography>
                    <Launch sx={{ fontSize: 16 }} />
                  </Link>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Sell ticket section */}
        <Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
              mt: 4
            }}
          >
            <Typography sx={{ opacity: 0.5 }}>
              Can’t attend this event? Don’t worry. You can resell your ticket
            </Typography>
            <ContainedButton
              label="Sell Ticket"
              variant="contained"
              sx={{ background: "#AE6DC2" }}
            />
          </Box>
        </Box>
      </Stack>
    </FlatCard>
  )
}

export default MyTicketDetails
