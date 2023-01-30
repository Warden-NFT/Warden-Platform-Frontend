import { date, number, object, string } from "yup"

export const CreateEventStep2Schema = object().shape(
  {
    startDate: date()
      .typeError("Invalid date")
      .required("Event start date cannot be empty")
      .test(
        "isLeast",
        "Start date must be before end date and door time",
        (val, _context) => {
          return !(
            val &&
            (_context.parent.endDate < val || _context.parent.doorTime < val)
          )
        }
      )
      .test("isNotPast", "Start date cannot be in the past", (val) => {
        if (val && new Date() > val) return false
        return true
      }),
    endDate: date()
      .typeError("Invalid date")
      .required("Event end date cannot be empty")
      .test(
        "isLeast",
        "End date must be after end date and door time",
        (val, _context) => {
          return !(
            val &&
            (_context.parent.startDate > val || _context.parent.doorTime > val)
          )
        }
      )
      .test("isNotPast", "Start date cannot be in the past", (val) => {
        if (val && new Date() > val) return false
        return true
      }),
    doorTime: date()
      .typeError("Invalid date")
      .required("Event door time cannot be empty")
      .test(
        "isLeast",
        "Door time must be between the start date and end date",
        (val, _context) => {
          return !(
            val &&
            (_context.parent.startDate > val || _context.parent.endDate < val)
          )
        }
      )
      .test("isNotPast", "Start date cannot be in the past", (val) => {
        if (val && new Date() > val) return false
        return true
      }),
    location: object()
      .nullable()
      .notRequired()
      .when("online_url", (val) => {
        console.log(val)
        if (val) {
          return object().notRequired().nullable()
        } else {
          return object()
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
        }
      }),
    online_url: string()
      .notRequired()
      .when("location", (val) => {
        if (val) {
          return string().notRequired()
        } else {
          return string()
            .url("Invalid URL")
            .required("Online event location can't be empty")
        }
      })
  },
  [
    ["location", "online_url"],
    ["online_url", "location"]
  ]
)
