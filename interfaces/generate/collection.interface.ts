import { TicketTypes } from "../ticket/ticket.interface";
import { LayeredAssetData } from "./file.interface";

export interface CompleteCollectionInfo {
  collectionName: string;
  distributedBy: string;
  externalUrl: string;
  description: string;
  ticketType: TicketTypes;
}

export interface LayeredCollectionInfo extends CompleteCollectionInfo {
  amount: number;
  layers: LayeredAssetData[];
}