import { TicketTypes } from "../ticket/ticket.interface";

export type GenerationMode = "LAYERED" | "ASSET";
export interface CompleteCollectionInfo {
  collectionName: string;
  distributedBy: string;
  externalUrl: string;
  description: string;
  ticketType: TicketTypes;
}
