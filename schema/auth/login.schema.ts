import { object, string } from "yup"

export const LoginSchema = object({
  phoneNumber: string()
    .required("Phone number cannot be empty")
    .matches(
      /^((((\+66|66|0)\d{2})-?\d{3}-?\d{4})|(-))$/,
      "Invalid phone number"
    ),
  password: string().required("Password cannot be empty")
})
