import { number, object, string, boolean, array } from "yup"

export const CreateCompleteTicketStep1Schema = object().shape(
  {
    currency: string()
      .oneOf(["ETH", "MATIC"], "This currency is not yet supported")
      .required("Currency is required"),
    name: string()
      .max(100, "Ticket name is too long")
      .required("Ticket name is required"),
    subjectOf: string().required("All ticket must be binded with an event"),
    description: string().max(500, "Ticket description is too long"),
    enableResale: boolean().required("This field is required"),
    enableRoyaltyFee: boolean().when(["enableResale"], {
      is: true,
      then: (schema) => schema.required("This field is required")
    }),
    royaltyFeePercentage: number().when(["enableResale", "enableRoyaltyFee"], {
      is: true,
      then: number()
        .min(0, "Minimum is 0")
        .max(20, "Number cannot exceed 20%")
        .required("This field is required")
    }),
    // Not allow enabling ticket type that contradict General Admission
    generalAdmissionEnabled: boolean()
      .when(["generalAdmissionEnabled", "reservedSeatEnabled"], {
        is: false,
        then: (schema) => schema.required("This field is required")
      })
      .test(
        "hasContradictTicketType",
        "You cannot enable Researved Seats",
        (value, ctx) => {
          const { reservedSeatEnabled } = ctx.parent
          return (value && reservedSeatEnabled) === false
        }
      ),
    // Not allow enabling ticket type that contradict Reserved Seats
    reservedSeatEnabled: boolean()
      .isFalse("This feature is still disabled")
      .default(false),
    vipEnabled: boolean().test(
      "hasOtherEnabled",
      "You must enable other ticket types before enabling VIP ticket",
      (_, ctx) => {
        const { generalAdmissionEnabled, reservedSeatEnabled } = ctx.parent
        return generalAdmissionEnabled || reservedSeatEnabled
      }
    ),
    price: object().when(["generalAdmissionEnabled"], {
      is: true,
      then: object().shape({
        general: object().shape({
          default: number()
            .min(0, "Minimum is 0")
            .required("This field is required"),
          min: number()
            .min(0, "Minimum is 0")
            .when(["enableResale"], {
              is: true,
              then: (schema) => schema.required()
            }),
          max: number()
            .min(0, "Minimum is 0")
            .test(
              "max",
              "Max value should be higher than the resale minimum value.",
              (val: number | undefined, ctx: any) => {
                return val && ctx && val > ctx.parent.min
              }
            )
            .when(["enableResale"], {
              is: true,
              then: (schema) => schema.required("This field is required")
            })
        })
      })
    })
  },
  [
    ["generalAdmissionEnabled", "generalAdmissionEnabled"],
    ["vipEnabled", "vipEnabled"],
    ["reservedSeatEnabled", "reservedSeatEnabled"]
  ]
)

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
