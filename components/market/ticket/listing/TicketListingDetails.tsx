import { Stack, Typography, Alert, Box, Grid } from "@mui/material"
import { grey, blue } from "@mui/material/colors"
import moment from "moment"
import React from "react"
import { EventTicket } from "../../../../dtos/ticket/ticket.dto"
import TicketCard from "../TicketCard"
import { Event } from "../../../../interfaces/event/event.interface"

type Props = {
  ticket: EventTicket
  event: Event
  statusChecked: boolean
  isSold: boolean
  isResaleTicket: boolean
}

function TicketListingDetails({
  ticket,
  event,
  statusChecked,
  isSold,
  isResaleTicket
}: Props) {
  function getEventLocationUrl() {
    if (event.online_url) {
      return event.online_url
    } else if (event.location?.place_id) {
      return `https://www.google.com/maps/place/?q=place_id:${event.location.place_id}`
    }

    return "/marketplace"
  }

  return (
    <Box
      sx={{
        border: 2,
        borderRadius: 2,
        padding: 2,
        backgroundColor: "white"
      }}
    >
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} md={4} lg={3} sx={{ position: "relative", mb: 3 }}>
          <TicketCard
            ticketId={ticket?._id ?? ""}
            image={ticket?.ticketMetadata[0].image as string}
            name={ticket?.name ?? ""}
            ticketTypeLabel={ticket?.ticketType ?? ""}
            price={(ticket?.price?.amount ?? "").toString()}
            sx={
              statusChecked && isSold
                ? { filter: "saturate(0.5)", opacity: 0.7 }
                : undefined
            }
          />
          {statusChecked && isSold && (
            <Typography
              variant="h3"
              fontWeight="600"
              color={grey[100]}
              sx={{ position: "absolute", top: "80px", left: "40px" }}
            >
              SOLD
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Box sx={{ width: "100%" }}>
            {isResaleTicket && (
              <Alert
                severity="info"
                sx={{
                  backgroundColor: blue[500],
                  color: "white",
                  marginBottom: 2
                }}
              >
                This is a resale ticket by {ticket.ownerHistory.at(-2)}
              </Alert>
            )}
            <Stack>
              <Typography variant="h6" component="h1">
                Ticket Details
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color={grey[500]}>Ticket Name</Typography>
                <Typography>{ticket.name}</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color={grey[500]}>Description</Typography>
                <Typography>{ticket.description}</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color={grey[500]}>Type</Typography>
                <Typography>{ticket.ticketType}</Typography>
              </Stack>
              <Typography variant="h6" component="h1">
                Event Details
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color={grey[500]}>Event Date</Typography>
                <Typography>{moment(event.startDate).format("lll")}</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color={grey[500]}>Door Time</Typography>
                <Typography>{moment(event.doorTime).format("lll")}</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color={grey[500]}>Location</Typography>
                <a
                  target="_blank"
                  href={getEventLocationUrl()}
                  rel="noopener noreferrer"
                >
                  <Typography>
                    {event.location?.structured_formatting.main_text ||
                      event.online_url}
                  </Typography>
                </a>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TicketListingDetails
