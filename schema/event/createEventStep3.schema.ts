import { number, object } from "yup"

export const CreateEventStep3Schema = object().shape(
  {
    general: number().when("general", (val, schema) => {
      if (val === 0) {
        return number().min(1, "Require at least 1 ticket")
      } else {
        return number().notRequired()
      }
    }),
    vip: number().when("vip", (val, schema) => {
      if (val === 0) {
        return number().min(1, "Require at least 1 ticket")
      } else {
        return number().notRequired()
      }
    }),
    reservedSeats: number().when("reservedSeats", (val, schema) => {
      if (val === 0) {
        return number().min(1, "Require at least 1 ticket")
      } else {
        return number().notRequired()
      }
    })
  },
  [
    ["general", "general"],
    ["vip", "vip"],
    ["reservedSeats", "reservedSeats"]
  ]
)
