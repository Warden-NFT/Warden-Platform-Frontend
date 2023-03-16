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
  smartContractTicketId?: number
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
  hasUsed: boolean
}

export interface TicketCollectionDTO {
  _id?: string
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
  resaleTicketPurchasePermission: ResaleTicketPurchasePermission[]
}

export interface MyTicketsDTO {
  myTickets: EventTicket[]
  myTicketListing: EventTicket[]
}

export interface TicketQuotaCheckResultDTO {
  ownedTicketsCount: number
  quota: number
  allowPurchase: boolean
  resalePurchaseApproved?: boolean
  resalePurchasePendingApproval?: boolean
}

export interface ResaleTicketPurchasePermission {
  _id?: string | undefined
  address: string
  ticketCollectionId: string
  ticketId: string
  smartContractTicketId: number
  approved?: boolean
}

export interface ResaleTicketPurchasePermissionRequestsList {
  approved: ResaleTicketPurchasePermission[]
  notApproved: ResaleTicketPurchasePermission[]
}
