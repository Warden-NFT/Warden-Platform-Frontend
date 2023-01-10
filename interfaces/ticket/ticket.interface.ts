export type TicketTypes = "GENERAL" | "VIP" | "RESERVED_SEAT";

export interface TicketSelectValues {
  name: string;
  label: string;
  isDisabled: boolean;
  value: TicketTypes;
}
