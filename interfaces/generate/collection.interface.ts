import { EventId } from "../../dtos/ticket/ticket.dto"
import { SupportedDigitalCurrency } from "../currency/currency.interface"

export type GenerationMode = "LAYERED" | "ASSET"

export interface TicketInfo {
  currency: SupportedDigitalCurrency
  name: string
  description: string
  subjectOf: EventId
  generalAdmissionEnabled: boolean
  vipEnabled: boolean
  vipBenefit?: string
  reservedSeatEnabled: boolean
  price: TicketTypePricing
  enableResale: boolean
  enableRoyaltyFee: boolean
  royaltyFeePercentage: number
  ticketQuota: TicketQuota
}

export interface TicketQuota {
  general?: number
  vip?: number
  reservedSeat?: number
}
export interface TicketTypePricing {
  general?: TicketPriceSetting
  vip?: TicketPriceSetting
  reservedSeat?: TicketPriceSetting
}

export interface TicketPriceSetting {
  default: number
  min: number
  max: number
}

export interface LayeredAssetInfo extends TicketInfo {
  generationAmount: number
  hasAssetReversed: boolean
}
