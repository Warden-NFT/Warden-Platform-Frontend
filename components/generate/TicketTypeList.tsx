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
      sx={{ width: "100%", height: "650px", overflowX: "scroll" }}
    >
      <Ticket
        img="/images/ticket-types/general-admission.jpg"
        ticketType="GENERAL"
        eventName="Creating a ticket"
        eventOrganizer="Organizer name"
        date={new Date()}
        location="Warden Platform"
        QRCodeValue="Permit attendee entry to an event or activity."
        onClick={() => handleSelectTicket("GENERAL")}
      />
      <Ticket
        img="/images/ticket-types/reserved-seats.jpg"
        ticketType="RESERVED_SEAT"
        eventName="Creating a ticket"
        eventOrganizer="Organizer name"
        date={new Date()}
        location="Warden Platform"
        QRCodeValue="Grant attendee option to choose their seats."
        onClick={() => handleSelectTicket("RESERVED_SEAT")}
      />
      <Ticket
        img="/images/ticket-types/reserved-seats.jpg"
        ticketType="RESERVED_SEAT"
        eventName="Creating a ticket"
        eventOrganizer="Organizer name"
        date={new Date()}
        location="Warden Platform"
        QRCodeValue="Grant attendee option to choose their seats."
        onClick={() => handleSelectTicket("RESERVED_SEAT")}
      />
    </Stack>
  )
}

export default TicketTypeList
