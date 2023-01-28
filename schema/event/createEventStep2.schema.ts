import { date, number, object, string } from "yup"

export const CreateEventStep2Schema = object({
  startDate: date()
    .typeError("Invalid date")
    .required("Event start date cannot be empty"),
  endDate: date()
    .typeError("Invalid date")
    .required("Event end date cannot be empty"),
  doorTime: date()
    .typeError("Invalid date")
    .required("Event door time cannot be empty"),
  location: object()
    .typeError("Invalid Location")
    .shape({
      description: string()
        .typeError("Invalid location")
        .required("Event location cannot be empty"),
      structured_formatting: object()
        .nullable()
        .shape({
          main_text: string(),
          secondary_text: string(),
          main_text_matched_substrings: object()
            .nullable()
            .shape({
              offset: number(),
              length: number()
            })
            .typeError("Invalid location")
            .nullable()
        })
        .required("Event location can't be empty")
    })
})
