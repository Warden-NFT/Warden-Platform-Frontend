import { TicketSelectValues } from "../../interfaces/ticket/ticket.interface";

export const TICKET_TYPES_SELECTS: TicketSelectValues[] = [
  {
    image: "/images/ticket-types/general-admission.jpg",
    name: "General Admission",
    label: "Permit attendee entry to an event or activity.",
    isDisabled: true,
    value: "GENERAL",
  },
  {
    image: "/images/ticket-types/reserved-seatings.jpg",
    name: "Reserved Seating",
    label: "Grant attendee option to choose their seats.",
    isDisabled: false,
    value: "RESERVED_SEAT",
  },
];
