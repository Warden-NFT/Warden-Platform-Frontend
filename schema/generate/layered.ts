import { array, number, object, string } from "yup"
import { LayerData } from "../../interfaces/generate/file.interface"
import { TicketTypes } from "../../interfaces/ticket/ticket.interface"
import { calculateCombination } from "../../utils/random/combination"

export const CreateLayeredTicketStep1Schema = object({
  currency: string()
    .oneOf(["ETH", "MATIC"], "This currency is not yet supported")
    .required("Currency is required"),
  name: string()
    .max(100, "Ticket name is too long")
    .required("Ticket name is required"),
  subjectOf: string().required("All ticket must be binded with an event"),
  description: string().max(500, "Ticket description is too long"),
  price: number()
    .min(0, "Ticket price must be a positive number")
    .required("Ticket price is required"),
  ticketType: string()
    .oneOf(
      ["GENERAL", "RESERVED_SEAT"] as TicketTypes[],
      "This ticket type is not supported"
    )
    .required("Ticket type is required")
})

export function createLayerOccurrenceForm(layers: LayerData[]) {
  const assetsLen = layers.map((layer) => layer.assets.length)
  const limit = calculateCombination(assetsLen)

  return object({
    generationAmount: number().test({
      name: "max",
      exclusive: false,
      params: {},
      message: "Quantity exceeds maximum combinations.",
      test: (_, context) => {
        return context.parent.generationAmount <= limit
      }
    }),
    layers: array().of(
      object({
        layerName: string()
          .max(100, "Layer name is too long")
          .required("Layer name is required"),
        layerOccurrence: number()
          .min(0, "Minumum is 0%")
          .max(100, "Maximum is 100%")
          .required("Layer Occurrence is required"),
        assets: array().of(
          object({
            name: string()
              .max(100, "Asset name is too long")
              .required("Asset name is required"),
            occurrence: number()
              .min(0, "Minumum is 0%")
              .max(100, "Maximum is 100%")
              .required("Asset occurrence is required")
          })
        )
      })
    )
  })
}
