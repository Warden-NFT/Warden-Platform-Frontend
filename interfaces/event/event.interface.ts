import { TicketsMetadata } from "../../dtos/ticket/metadata.dto"
import { PlaceType } from "./location.interface"

export type TicketType = "GENERAL" | "VIP" | "RESERVED_SEAT"
export type TicketTypeKey = "general" | "vip" | "reservedSeat"

export type EventStatusType =
  | "NOT_STARTED"
  | "ADMISSION_STARTED"
  | "EVENT_STARTED"
  | "EVENT_ENDED"

export enum EVENT_STATUS_TYPE {
  NOT_STARTED = "NOT_STARTED",
  ADMISSION_STARTED = "ADMISSION_STARTED",
  EVENT_STARTED = "EVENT_STARTED",
  EVENT_ENDED = "EVENT_ENDED"
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
  image: File | string
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
  checkName: string
  type: string
  checked: boolean
  supply: number
  label: string
}
