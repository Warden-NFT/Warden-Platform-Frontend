import { Stack } from "@mui/material"
import React from "react"
import { TicketTypes } from "../../interfaces/ticket/ticket.interface"
import Ticket from "../UI/ticket/Ticket"

interface Props {
  handleSelectTicket: (type: TicketTypes) => void
}

function TicketTypeList({ handleSelectTicket }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ width: "100%", height: "650px", overflowX: "auto" }}
    >
      <Ticket
        assetSrc="/images/ticket-types/general-admission.jpg"
        assetName="General Admission"
        ticketType="GENERAL"
        eventName="Creating a ticket"
        eventOrganizer="Organizer name"
        date={new Date()}
        location="Warden Platform"
        codeDisplayMode="TEXT"
        codeValue="Permit attendee entry to an event or activity."
        onClick={() => handleSelectTicket("GENERAL")}
      />
      <Ticket
        assetSrc="/images/ticket-types/reserved-seats.jpg"
        assetName="Researved Seats"
        ticketType="RESERVED_SEAT"
        eventName="Creating a ticket"
        eventOrganizer="Organizer name"
        date={new Date()}
        location="Warden Platform"
        codeDisplayMode="TEXT"
        codeValue="Grant attendee option to choose their seats."
        onClick={() => handleSelectTicket("RESERVED_SEAT")}
      />
    </Stack>
  )
}

export default TicketTypeList
