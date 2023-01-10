import { TicketSelectValues } from "../../interfaces/ticket/ticket.interface";

export const TICKET_TYPES_SELECTS: TicketSelectValues[] = [
  {
    name: "General Admission",
    label: "Permit attendee entry to an event or activity.",
    isDisabled: true,
    value: "GENERAL",
  },
  {
    name: "VIP",
    label:
      "Special access ticket that grant all access in an event or activity.",
    isDisabled: true,
    value: "VIP",
  },
  {
    name: "Reserved Seating",
    label: "Grant attendee option to choose their seats.",
    isDisabled: false,
    value: "RESERVED_SEAT",
  },
];
