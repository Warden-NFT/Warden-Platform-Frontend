import { object, string } from "yup"

export const CreateEventSchema = object({
  name: string().required("Event name cannot be empty"),
  description: string().required("Event description cannot be empty"),
  url: string().url("Invalid URL")
})
