export type TicketType = "GENERAL" | "VIP" | "RESERVED_SEAT"

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
  location: string
  ticketSupply: {
    general: number
    vip: number
    reservedSeat: number
    total: number
  }
  organizerId: string
  subEventId: string
  superEventId: string
  description: string
  identifier: string
  image: string
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
