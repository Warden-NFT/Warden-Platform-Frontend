import {
  EventId,
  TicketsMetadataDTO
} from "../../dtos/generate/ticket/ticket.dto"
import { SupportedDigitalCurrency } from "../currency/currency.interface"
import { TicketTypes } from "../ticket/ticket.interface"

export type GenerationMode = "LAYERED" | "ASSET"

export interface TicketInfo {
  currency: SupportedDigitalCurrency
  name: string
  description: string
  subjectOf: EventId
  ticketMetadata: TicketsMetadataDTO
  price: number
  ticketType: TicketTypes
}

export interface LayeredAssetInfo extends TicketInfo {
  generationAmount: number
  hasAssetReversed: boolean
}
