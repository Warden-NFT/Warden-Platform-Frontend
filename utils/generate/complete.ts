import { client } from "../../configs/axios/axiosConfig"
import { TicketsMetadata } from "../../dtos/ticket/metadata.dto"
import { EventTicket, TicketSetDTO } from "../../dtos/ticket/ticket.dto"
import { User } from "../../interfaces/auth/user.interface"
import { TicketType } from "../../interfaces/event/event.interface"
import { TicketInfo } from "../../interfaces/generate/collection.interface"
import { UploadedCompleteAsset } from "../../interfaces/generate/file.interface"

const URL = process.env.NEXT_PUBLIC_WARDEN_API_URL

export function createAssetMetadata(
  assets: UploadedCompleteAsset[],
  files: File[],
  formInfo: TicketInfo,
  ticketType: TicketType
): TicketsMetadata[] {
  return assets.map((asset, i) => {
    return {
      name: asset.name,
      description: `Ticket cover image ${asset.name}`,
      image: `${process.env.NEXT_PUBLIC_GCP_STORAGE_URL}${formInfo.subjectOf}/${files[i].name}`,
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

export function createEventTicket(
  assetMetadata: TicketsMetadata[],
  info: TicketInfo,
  address: string | undefined,
  user: User | undefined
): EventTicket[] {
  if (!address || !user || user?._id == null) return []

  const now = new Date()
  return assetMetadata.map((data, i) => {
    const eventTicket: EventTicket = {
      dateIssued: now,
      ticketNumber: i,
      name: `${info.name}_${i}`,
      ticketMetadata: [data],
      description: info.description,
      ownerHistory: [],
      benefits:
        info.vipEnabled && info.vipDescription
          ? info.vipDescription
          : undefined,
      ownerId: user._id ?? ""
    }

    return eventTicket
  })
}

export async function setTicketToEvent(
  eventTickets: EventTicket[],
  vipTickets: EventTicket[],
  formInfo: TicketInfo,
  user: User | undefined
) {
  if (!user || !user._id) return

  const now = new Date()
  const payload: TicketSetDTO = {
    tickets: {
      generalTickets: eventTickets,
      vipTickets: vipTickets
    },
    createdDate: now,
    ownerId: user._id,
    ticketPrice: formInfo.price,
    smartContractAddress: "",
    subjectOf: formInfo.subjectOf,
    ownerAddress: user._id,
    royaltyFee: formInfo.enableRoyaltyFee
      ? formInfo.royaltyFeePercentage / 100
      : 0,
    currency: formInfo.currency,
    enableResale: formInfo.enableResale,
    ticketQuota: formInfo.ticketQuota
  }

  const res = await client.post<{
    acknowledged: boolean
    insertedIds: string[]
  }>(`${URL}/ticket/createEventTickets`, payload)
  return res.data
}

export async function uploadAsset(
  files: File[],
  metadata: TicketsMetadata[],
  folder: string
) {
  if (metadata.length <= 0) return []
  const formData = new FormData()
  files.forEach((file) => {
    formData.append("files", file)
  })
  formData.append("folder", folder)
  formData.append("metadata", JSON.stringify(metadata))
  const res = await client.post(`${URL}/ticket/saveTicketSetImages`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })

  return res.data
}

export async function uploadEventTicket(assetMetadata: EventTicket[]) {
  const res = await client.post<{
    acknowledge: boolean
    insertedIds: string[]
  }>(`${URL}/ticket/createEventTickets`, assetMetadata)
  return res.data
}
