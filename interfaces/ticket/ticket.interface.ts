export type TicketTypes = "GENERAL" | "VIP" | "RESERVED_SEAT";

export interface TicketSelectValues {
  image: string;
  name: string;
  label: string;
  isDisabled: boolean;
  value: TicketTypes;
}
