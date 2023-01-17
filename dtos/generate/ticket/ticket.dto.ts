import { TicketInfo } from '../../../interfaces/generate/collection.interface'

export type EventId = string

export interface TicketEventDTO extends TicketInfo {
  dateIssued: Date
  ownerAddress: string
  issuedBy: string // Event Organizer ID
  ticketNumber: number // Auto Generated from Smart Contract
  ownerId: string
  smartContractAddress: string
  publicationDate: Date
}

export interface TicketsMetadataDTO {
  data: TicketMetadata[]
}

export interface TicketMetadata {
  attributes: TicketAttribute[]
  description: string
  image: string
  name: string
}

export interface TicketAttribute {
  value: string
  trait_type: string
}
