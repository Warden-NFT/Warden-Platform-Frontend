import { object, string } from "yup";

export const CompleteFormSchema = object({
  collectionName: string()
    .required("This field is required")
    .max(60, "Collection name is too long"),
  distributedBy: string()
    .required("This field is required")
    .max(40, "Distributed by field is too long"),
  externalUrl: string().url("Please enter a valid URL"),
  description: string(),
  ticketType: string().required("This field is required"),
});
