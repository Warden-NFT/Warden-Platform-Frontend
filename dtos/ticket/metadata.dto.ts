export interface TicketsMetadata {
  attributes: TicketAttribute[]
  description: string
  image: string
  name: string
}

export interface TicketAttribute {
  value: string | number | boolean
  trait_type: string
}
