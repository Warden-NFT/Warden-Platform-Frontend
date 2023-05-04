import { number, object, string } from "yup"

export const SellTicketFormSchema = object({
  resalePrice: number()
    .required("The amount cannot be empty")
    .test(
      "Greater than or equal to the min resale price",
      "Ticket resale price should be higher than the minimum price set by the event organizer",
      (value, context) => {
        return Boolean(
          value !== undefined && value >= context.parent.minResalePrice
        )
      }
    )
    .test(
      "Lower than or equal to the max resale price",
      "Ticket resale price should not exceed the maximum price set by the event organizer",
      (value, context) => {
        return Boolean(
          value !== undefined && value <= context.parent.maxResalePrice
        )
      }
    ),
  currency: string().required(),
  minResalePrice: number().required().min(0, "Minimum is 0"),
  maxResalePrice: number().required()
})
