import { TicketsMetadata } from "./metadata.dto"
import {
  GenerationMode,
  TicketQuota,
  TicketTypePricing
} from "../../interfaces/generate/collection.interface"
import { SupportedDigitalCurrency } from "../../interfaces/currency/currency.interface"
import { TicketTypes } from "../../interfaces/ticket/ticket.interface"

export type EventId = string

export type TicketGenerationMode = "complete" | "layer"

export interface EventTicket {
  _id?: string
  dateIssued: Date
  ticketNumber: number
  name: string // ticket name
  description: string
  ticketMetadata: TicketsMetadata[]
  ownerId: string
  ownerHistory: string[]
  ticketType: TicketTypes
  price: {
    amount: number
    currency: SupportedDigitalCurrency
  }
  benefits?: string
}

export interface TicketCollectionDTO {
  tickets: {
    general?: EventTicket[]
    vip?: EventTicket[]
    reservedSeat?: EventTicket[]
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
  generationMethod: GenerationMode
}
