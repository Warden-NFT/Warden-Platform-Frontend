import { TicketsMetadata } from "../../dtos/ticket/metadata.dto"
import { EventTicket, EventVIPTicket } from "../../dtos/ticket/ticket.dto"
import { TicketType } from "../../interfaces/event/event.interface"
import { TicketInfo } from "../../interfaces/generate/collection.interface"
import { UploadedCompleteAsset } from "../../interfaces/generate/file.interface"

export function createTicketMetadata(
  assets: UploadedCompleteAsset[],
  formInfo: TicketInfo,
  ticketType: TicketType
): TicketsMetadata[] {
  return assets.map((asset) => {
    return {
      name: asset.name,
      description: `Ticket cover image ${asset.name}`,
      image: `https://storage.googleapis.com/nft-generator-microservice-bucket-test/media/${formInfo.subjectOf}/${asset.name}`,
      attributes: [
        { trait_type: "id", value: asset.id.toString() },
        { trait_type: "quantity", value: asset.quantity.toString() },
        { trait_type: "width", value: asset.dimension.width.toString() },
        { trait_type: "height", value: asset.dimension.height.toString() },
        { trait_type: "ticketType", value: ticketType }
      ]
    }
  })
}

export async function uploadEventTicketMetadata(
  metadata: TicketsMetadata[],
  info: TicketInfo,
  address: string | undefined
): Promise<EventTicket[]> {
  if (metadata.length <= 0 || !address) return []

  const now = new Date()
  return metadata.map((data, i) => {
    const eventTicket: EventTicket = {
      dateIssued: now,
      ticketNumber: i,
      name: `${info.name}_${i}}`,
      ticketMetadata: [data],
      description: info.description,
      ownerAddress: address,
      ownerHistory: []
    }

    return eventTicket
  })
}

export async function uploadEventVIPTicketMetadata(
  metadata: TicketsMetadata[],
  info: TicketInfo,
  address: string | undefined
): Promise<EventVIPTicket[]> {
  if (metadata.length <= 0 || !address) return []

  const now = new Date()
  return metadata.map((data, i) => {
    const eventTicket: EventVIPTicket = {
      dateIssued: now,
      ticketNumber: i,
      name: `${info.name}_${i}}`,
      ticketMetadata: [data],
      description: info.description,
      ownerAddress: address,
      ownerHistory: [],
      benefits: ""
    }

    return eventTicket
  })
}
