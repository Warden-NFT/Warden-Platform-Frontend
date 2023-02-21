import { number, object, string, boolean, array } from "yup"

export const CreateTicketInfoSchema = object().shape(
  {
    currency: string()
      .default("ETH")
      .oneOf(["ETH", "MATIC"], "This currency is not yet supported")
      .required("Currency is required"),
    name: string()
      .max(100, "Ticket name is too long")
      .required("Ticket name is required"),
    subjectOf: string().required("All ticket must be binded with an event"),
    description: string().max(500, "Ticket description is too long"),
    enableResale: boolean().default(false).required("This field is required"),
    enableRoyaltyFee: boolean()
      .default(false)
      .when("enableResale", {
        is: true,
        then: (schema) => schema.required("This field is required")
      }),
    royaltyFeePercentage: number().when(["enableResale", "enableRoyaltyFee"], {
      is: [true, true],
      then: number()
        .min(0, "Minimum is 0")
        .max(20, "Number cannot exceed 20%")
        .required("This field is required")
    }),
    ticketQuota: object().shape({
      general: number()
        .min(1, "Minimum cannot be below than 1")
        .when("enableResale", {
          is: true,
          then: (schema) => schema.required("This field is required")
        }),
      vip: number()
        .min(1, "Minimum cannot be below than 1")
        .when(["enableResale", "vipEnabled"], {
          is: [true, true],
          then: (schema) => schema.required("This field is required")
        })
    }),
    // Not allow enabling ticket type that contradict General Admission
    generalAdmissionEnabled: boolean()
      .default(true)
      .when(["generalAdmissionEnabled", "reservedSeatEnabled"], {
        is: [true, false],
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
    reservedSeatEnabled: boolean().default(false),
    vipBenefit: string().when(["vipEnabled"], {
      is: true,
      then: (schema) =>
        schema
          .max(200, "Mamimum words reached")
          .required("This field is required")
    }),
    vipEnabled: boolean()
      .default(false)
      .test(
        "hasOtherEnabled",
        "You must enable other ticket types before enabling VIP ticket",
        (_, ctx) => {
          const { generalAdmissionEnabled, reservedSeatEnabled } = ctx.parent
          if (generalAdmissionEnabled || reservedSeatEnabled) {
            return true
          } else {
            return false
          }
        }
      ),
    price: object()
      .when("generalAdmissionEnabled", {
        is: true,
        then: object().shape({
          general: object().shape({
            default: number()
              .min(0, "Minimum is 0")
              .required("This field is required"),
            min: number()
              .min(0, "Minimum is 0")
              .test(
                "lowerThanDefault",
                "Min price should be lower than the default price.",
                (val, ctx) => {
                  return val != null && ctx.parent && val <= ctx.parent.default
                }
              )
              .when("enableResale", {
                is: true,
                then: (schema) => schema.required()
              }),
            max: number()
              .min(0, "Minimum is 0")
              .test(
                "max",
                "Max price should be lower than the resale minimum price.",
                (val, ctx) => {
                  return (
                    val != null &&
                    ctx.parent &&
                    val <= ctx.parent.default &&
                    val >= ctx.parent.min
                  )
                }
              )
              .when("enableResale", {
                is: true,
                then: (schema) => schema.required("This field is required")
              })
          })
        })
      })
      .when(["vipEnabled"], {
        is: [true],
        then: object().shape({
          vip: object().shape({
            default: number()
              .min(0, "Minimum is 0")
              .required("This field is required"),
            min: number().when("enableResale", {
              is: true,
              then: (schema) =>
                schema
                  .min(0, "Minimum is 0")
                  .test(
                    "lowerThanDefault",
                    "Min price should be lower than the default price max price.",
                    (val, ctx) => {
                      return (
                        val != null && ctx.parent && val <= ctx.parent.default
                      )
                    }
                  )
                  .required()
            }),
            max: number().when(["enableResale"], {
              is: true,
              then: (schema) =>
                schema
                  .min(0, "Minimum is 0")
                  .test(
                    "max",
                    "Max price should be lower than the resale minimum price.",
                    (val, ctx) => {
                      return (
                        val != null &&
                        ctx.parent &&
                        val <= ctx.parent.default &&
                        val >= ctx.parent.min
                      )
                    }
                  )
            })
          })
        })
      })
  },
  [
    ["generalAdmissionEnabled", "generalAdmissionEnabled"],
    ["reservedSeatEnabled", "reservedSeatEnabled"],
    ["vipEnabled", "vipEnabled"]
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
