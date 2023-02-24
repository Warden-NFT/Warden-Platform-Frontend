import { EventTicket, TicketCollectionDTO } from "../../dtos/ticket/ticket.dto"
import { EventOrganizerUser } from "../auth/user.interface"
import { Event } from "../event/event.interface"
import { TicketTypePricing } from "../generate/collection.interface"

export interface MarketEvents {
  organizerInfo: EventOrganizerUser
  events: Event[]
  eventTicketPreviews: EventTicketPreviews[]
}

export interface MarketTickets {
  organizerInfo: EventOrganizerUser
  event: Event
  ticketCollection: TicketCollectionDTO
}

export interface EventTicketPreviews {
  tickets: {
    general: EventTicket[]
    vip: EventTicket[]
    reservedSeat: EventTicket[]
  }
  ticketPrice: TicketTypePricing
}

export type EventTicketPreviewsType = "general" | "vip" | "reservedSeat"
