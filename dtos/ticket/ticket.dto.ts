import { TicketsMetadata } from "./metadata.dto"

export type EventId = string

export interface EventTicket {
  _id?: string
  dateIssued: Date
  ticketNumber: number
  name: string // ticket name
  description: string
  ticketMetadata: TicketsMetadata[]
  ownerAddress: string
  ownerHistory: string[]
}

export interface EventVIPTicket extends EventTicket {
  benefits: string
}
