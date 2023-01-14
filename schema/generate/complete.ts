import { object, string } from "yup";
import { TicketTypes } from "../../interfaces/ticket/ticket.interface";

export const CompleteAssetFormSchema = object({
  eventName: string()
    .required("This field is required")
    .max(100, "Event name is too long"),
  organizerName: string()
    .required("This field is required")
    .max(100, "Event organizer name is too long"),
  eventExternalUrl: string().url("Please enter a valid URL"),
  description: string(),
  ticketType: string()
    .oneOf(["GENERAL", "RESERVED_SEAT"] as TicketTypes[])
    .required("This field is required"),
});
