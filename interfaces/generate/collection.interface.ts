import { TicketTypes } from "../ticket/ticket.interface";

export type GenerationMode = "LAYERED" | "ASSET";
export interface CompleteAssetInfo {
  eventName: string;
  organizerName: string;
  eventExternalUrl: string;
  ticketType: TicketTypes | null;
  description: string;
}
