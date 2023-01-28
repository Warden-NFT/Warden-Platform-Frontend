import { object, string } from "yup"

export const CreateEventStep1Schema = object({
  name: string().required("Event name cannot be empty"),
  description: string().required("Event description cannot be empty"),
  url: string().url("Invalid URL")
})
