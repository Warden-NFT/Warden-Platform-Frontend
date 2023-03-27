export type TicketTypes = "GENERAL" | "VIP" | "RESERVED_SEAT"

export interface TicketSelectValues {
  image: string
  name: string
  label: string
  isDisabled: boolean
  value: TicketTypes
}

export interface TicketQRUtilizeValue {
  userId: string
  eventId: string
  walletAddress: string
  ticketId: string
  generateSince: Date
}
export interface TicketPurchasePermissionResponse {
  allowed: boolean
  reason: string
}
