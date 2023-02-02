import { boolean, number, object } from "yup"

export const CreateEventStep3Schema = object().shape(
  {
    enableGeneral: boolean(),
    enableVip: boolean(),
    enableReservedSeat: boolean(),
    general: number()
      .notRequired()
      .when(["general", "enableGeneral"], {
        is: (general: number, enableGeneral: boolean) =>
          enableGeneral && general === 0,
        then: number().min(1, "Require at least 1 ticket")
      })
      .when(["general", "enableGeneral"], {
        is: (general: number, enableGeneral: boolean) =>
          !enableGeneral && general === 0,
        then: number().notRequired()
      }),
    vip: number()
      .notRequired()
      .when(["vip", "enableVip"], {
        is: (vip: number, enableVip: boolean) => enableVip && vip === 0,
        then: number().min(1, "Require at least 1 ticket")
      })
      .when(["vip", "enableVip"], {
        is: (vip: number, enableVip: boolean) => !enableVip && vip === 0,
        then: number().notRequired()
      }),
    reservedSeat: number()
      .notRequired()
      .when(["reservedSeat", "enableReservedSeat"], {
        is: (reservedSeat: number, enableReservedSeat: boolean) =>
          enableReservedSeat && reservedSeat === 0,
        then: number().min(1, "Require at least 1 ticket")
      })
      .when(["reservedSeat", "enableReservedSeat"], {
        is: (reservedSeat: number, enableReservedSeat: boolean) =>
          !enableReservedSeat && reservedSeat === 0,
        then: number().notRequired()
      })
  },
  [
    ["general", "general"],
    ["vip", "vip"],
    ["reservedSeat", "reservedSeat"]
  ]
)
