import { TicketsMetadata } from "./metadata.dto"
import {
  TicketQuota,
  TicketTypePricing
} from "../../interfaces/generate/collection.interface"
import { SupportedDigitalCurrency } from "../../interfaces/currency/currency.interface"

export type EventId = string

export interface EventTicket {
  _id?: string
  dateIssued: Date
  ticketNumber: number
  name: string // ticket name
  description: string
  ticketMetadata: TicketsMetadata[]
  ownerId: string
  ownerHistory: string[]
  benefits?: string
}

export interface TicketSetDTO {
  tickets: {
    generalTickets?: EventTicket[]
    vipTickets?: EventTicket[]
    reservedSeatTickets?: EventTicket[]
  }
  createdDate: Date
  ownerId: string
  ownerAddress: string
  smartContractAddress: string
  subjectOf: string
  ticketPrice: TicketTypePricing
  royaltyFee: number
  enableResale: boolean
  currency: SupportedDigitalCurrency
  ticketQuota: TicketQuota
}
