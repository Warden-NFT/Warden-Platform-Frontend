import { number, object, string, boolean, array } from "yup"

export const CreateCompleteTicketStep1Schema = object({
  currency: string()
    .oneOf(["ETH", "MATIC"], "This currency is not yet supported")
    .required("Currency is required"),
  name: string()
    .max(100, "Ticket name is too long")
    .required("Ticket name is required"),
  subjectOf: string().required("All ticket must be binded with an event"),
  description: string()
    .notRequired()
    .max(500, "Ticket description is too long"),
  generalAdmissionEnabled: boolean().required(
    "At least one ticket type must be enabled"
  ),
  vipEnabled: boolean().notRequired(),
  price: object({
    general: object({
      default: number()
        .min(0, "Ticket price must be a positive number")
        .required("Ticket price is required"),
      min: number()
        .positive("Price must be positive")
        .required("Ticket price is required"),
      max: number()
        .positive("Price must be positive")
        .required("Ticket price is required")
    }).test({
      name: "required",
      exclusive: false,
      params: {},
      message: "Pricing of General Admission ticket is required",
      test: (_, context) => context.parent.generalAdmissionEnabled === true
    }),
    vip: object({
      default: number()
        .min(0, "Ticket price must be a positive number")
        .required("Ticket price is required"),
      min: number()
        .positive("Price must be positive")
        .required("Ticket price is required"),
      max: number()
        .positive("Price must be positive")
        .required("Ticket price is required")
    })
  }).required()
})

export const CompleteAssetCustomizeUtilitySchema = object({
  assets: array().of(
    object({
      id: number(),
      name: string().max(100, "Name is too long").required("Name is required"),
      quantity: number()
        .min(0, "Zero is the minimum quantity")
        .required("Quantity is required")
    })
  ),
  vipAssets: array().of(
    object({
      id: number(),
      name: string().max(100, "Name is too long").required("Name is required"),
      quantity: number()
        .min(0, "Zero is the minimum quantity")
        .required("Quantity is required")
    })
  )
})

export function getCompleteCustomizeUtilitySchema(
  generalPrice: number,
  vipPriec: number
) {
  return object({
    enableResale: boolean().required("This field is required"),
    enableRoyaltyFee: boolean().notRequired(),
    resaleCeilingPrice: number()
      .notRequired()
      .when(["enableResale"], {
        is: (resale: boolean) => resale === true,
        then: number().min(0, "Lowest is 0").max(100, "Highest is 100")
      }),
    resaleFloorPrice: number(),
    royaltyFeePercentage: number()
      .notRequired()
      .when(["enableResale", "enableRoyaltyFee"], {
        is: (resale: boolean, royalty: boolean) => resale && royalty,
        then: number().min(0, "Lowest is 0").max(100, "Highest is 100")
      })
    // .when(['enableResale'], {
    //   is: (enableResale: boolean) => {
    //     enableResale === true
    //   }
    //   then:
    // }),
  })
}

// export const CreateEventStep3Schema = object().shape(
//   {
//     enableGeneral: boolean(),
//     enableVip: boolean(),
//     enableReservedSeat: boolean(),
//     general: number()
//       .notRequired()
//       .when(["general", "enableGeneral"], {
//         is: (general: number, enableGeneral: boolean) =>
//           enableGeneral && general === 0,
//         then: number().min(1, "Require at least 1 ticket")
//       })
//       .when(["general", "enableGeneral"], {
//         is: (general: number, enableGeneral: boolean) =>
//           !enableGeneral && general === 0,
//         then: number().notRequired()
//       }),
//     vip: number()
//       .notRequired()
//       .when(["vip", "enableVip"], {
//         is: (vip: number, enableVip: boolean) => enableVip && vip === 0,
//         then: number().min(1, "Require at least 1 ticket")
//       })
//       .when(["vip", "enableVip"], {
//         is: (vip: number, enableVip: boolean) => !enableVip && vip === 0,
//         then: number().notRequired()
//       }),
//     reservedSeat: number()
//       .notRequired()
//       .when(["reservedSeat", "enableReservedSeat"], {
//         is: (reservedSeat: number, enableReservedSeat: boolean) =>
//           enableReservedSeat && reservedSeat === 0,
//         then: number().min(1, "Require at least 1 ticket")
//       })
//       .when(["reservedSeat", "enableReservedSeat"], {
//         is: (reservedSeat: number, enableReservedSeat: boolean) =>
//           !enableReservedSeat && reservedSeat === 0,
//         then: number().notRequired()
//       })
//   },
//   [
//     ["general", "general"],
//     ["vip", "vip"],
//     ["reservedSeat", "reservedSeat"]
//   ]
// )
