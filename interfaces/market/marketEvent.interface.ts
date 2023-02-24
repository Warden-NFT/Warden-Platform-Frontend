import { EventTicket } from "../../dtos/ticket/ticket.dto"
import { EventOrganizerUser } from "../auth/user.interface"
import { Event } from "../event/event.interface"
import { TicketTypePricing } from "../generate/collection.interface"

export interface MarketEvents {
  organizerInfo: EventOrganizerUser
  events: Event[]
  eventTicketPreviews: EventTicketPreviews[]
}

export interface EventTicketPreviews {
  tickets: {
    generalTickets: EventTicket[]
    vipTickets: EventTicket[]
    reservedSeatTickets: EventTicket[]
  }
  ticketPrice: TicketTypePricing
}

export type EventTicketPreviewsType =
  | "generalTickets"
  | "vipTickets"
  | "reservedSeatTickets"
