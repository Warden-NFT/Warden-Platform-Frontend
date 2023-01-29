import { number, object } from "yup"

export const CreateEventStep3Schema = object().shape(
  {
    general: number().when("general", (val) => {
      if (val === 0) {
        return number().notRequired().min(1, "Require at least 1 ticket")
      } else {
        return number().notRequired()
      }
    }),
    vip: number()
      .notRequired()
      .when("vip", (val) => {
        if (val === 0) {
          return number().notRequired().min(1, "Require at least 1 ticket")
        } else {
          return number().notRequired()
        }
      }),
    reservedSeats: number()
      .nullable()
      .when("reservedSeats", (val) => {
        if (val === 0) {
          return number().notRequired().min(1, "Require at least 1 ticket")
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
