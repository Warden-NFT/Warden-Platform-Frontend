import { array, number, object, string } from "yup";
import { LayeredAssetData } from "../../interfaces/generate/file.interface";
import { calculateCombination } from "../../utils/random/combination";

export const LayeredFormScham = object({
  collectionName: string()
    .required("This field is required")
    .max(60, "Collection name is too long"),
  distributedBy: string()
    .required("This field is required")
    .max(40, "Distributed by field is too long"),
  externalUrl: string().url("Please enter a valid URL"),
  description: string(),
  ticketType: string().required("This field is required"),
  layers: array(),
  amount: number()
    .min(1, "1 is the lowest limit")
    .test({
      name: "max",
      exclusive: false,
      params: {},
      message: "Amount exceeds maximum combinations.",
      test: (_, context) => {
        const _layers = context.parent.layers as LayeredAssetData[];
        const combinations = _layers.map((layer) => layer.assets.length);
        const limit = calculateCombination(combinations);
        return parseInt(context.parent.amount) <= limit;
      },
    })
    .required("This field is required"),
});
