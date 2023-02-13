import { TicketType } from "../../interfaces/event/event.interface"

export enum EVENT_STATUS {
  NOT_STARTED = "NotStarted",
  ADMISSION_STARTED = "AdmissionStarted",
  EVENT_STARTED = "EventStarted",
  EVENT_ENDED = "EventEnded"
}

export enum TICKET_TYPE {
  GENERAL = "GENERAL",
  VIP = "VIP",
  RESERVED_SEAT = "RESERVED_SEAT"
}

export const TICKET_TYPES: {
  type: TicketType
  label: string
  disabled: boolean
}[] = [
  {
    type: "GENERAL",
    label: "Permit attendee entry to an event or activity.",
    disabled: false
  },
  {
    type: "VIP",
    label: "Give attendee special tier by what you defined.",
    disabled: false
  },
  {
    type: "RESERVED_SEAT",
    label:
      "Grant attendee option to choose their seats. [IN DEVELOPMENT PROGRESS]",
    disabled: true
  }
]
