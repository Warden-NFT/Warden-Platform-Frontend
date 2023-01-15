import { object, ref, string } from 'yup'

export const RegisterSchema = object({
  phoneNumber: string()
    .required('Phone number cannot be empty')
    .matches(
      /^((((\+66|66|0)\d{2})-?\d{3}-?\d{4})|(-))$/,
      'Invalid phone number'
    ),
  email: string().required('This field is required').email('Invalid email'),
  username: string()
    .required('Username is required')
    .max(100, 'Username is too long'),
  password: string().required('Password cannot be empty'),
  repeatPassword: string()
    .required('This field is required')
    .oneOf([ref('password'), null], 'Passwords must match'),
  firstName: string()
    .required('First name is required')
    .max(60, 'First name is too long'),
  lastName: string()
    .required('Last name is required')
    .max(60, 'Last name is too long')
})
