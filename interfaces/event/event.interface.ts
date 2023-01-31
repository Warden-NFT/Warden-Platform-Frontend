import { PlaceType } from "./location.interface"

export type TicketType = "GENERAL" | "VIP" | "RESERVED_SEAT"
export type TicketTypeKey = "general" | "vip" | "reservedSeat"

export type EventStatusType =
  | "NotStarted"
  | "AdmissionStarted"
  | "EventStarted"
  | "EventEnded"

export type TicketsMetadata = {
  data: {
    attributes: { value: string; trait_type: string }[]
    description: string
    image: string
    name: string
  }[]
}

export interface Event {
  _id?: string
  eventStatus: EventStatusType
  eventKeywords: string[]
  location: PlaceType | null
  online_url: string
  ticketSupply: {
    general: number
    vip: number
    reservedSeat: number
  }
  organizerId: string
  subEventId: string
  superEventId: string
  description: string
  identifier: string
  image: File | string | undefined
  name: string
  url: string
  doorTime?: Date | null
  startDate?: Date | null
  endDate?: Date | null
  ticketType: TicketType
  ownerAddress: string
  smartContractAddress: string
  ticketsMetadata?: TicketsMetadata
}

export interface TicketSupplySettings {
  type: string
  checked: boolean
  supply: number
  label: string
}
