import { number, object, string } from "yup"

export const SellTicketFormSchema = object({
  resalePrice: number()
    .required("The amount cannot be empty")
    .test(
      "Greater than or equal to the min resale price",
      "Ticket resale price should be higher than the minimum price set by the event organizer",
      (value, context) => {
        return Boolean(value && value >= context.parent.minResalePrice)
      }
    )
    .test(
      "Lower than than or equal to the min resale price",
      "Ticket resale price should be lower than the maximum price set by the event organizer",
      (value, context) => {
        return Boolean(value && value <= context.parent.minResalePrice)
      }
    ),
  currency: string().required(),
  minResalePrice: number().required(),
  maxResalePrice: number().required()
})
