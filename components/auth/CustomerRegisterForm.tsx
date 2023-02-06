import { FormControl, FormLabel, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { client } from "../../configs/axios/axiosConfig"
import { UserContext } from "../../contexts/user/UserContext"
import { SuccessfulAuthDTO } from "../../interfaces/auth/auth.interface"
import { Account } from "../../interfaces/auth/user.interface"
import { RegisterSchema } from "../../schema/auth/register.schema"
import ContainedButton from "../UI/button/ContainedButton"
import Axios, { AxiosError } from "axios"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import { AlertType } from "../../interfaces/modal/alert.interface"

function CustomerRegisterForm() {
  const { setUserInfo } = useContext(UserContext)
  const router = useRouter()
  const { showErrorAlert } = useContext(LayoutContext)
  const { values, handleChange, touched, errors, handleSubmit, setErrors } =
    useFormik({
      initialValues: {
        phoneNumber: "",
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
        firstName: "",
        lastName: ""
      },
      validationSchema: RegisterSchema,
      onSubmit: async (data) => {
        try {
          const res = await client.post<SuccessfulAuthDTO>(
            "/user/registerCustomer",
            { ...data, accountType: Account.CUSTOMER }
          )
          setUserInfo(res.data)
          router.push("/auth/confirm-phone")
        } catch (error) {
          if (
            Axios.isAxiosError(error) &&
            (error as AxiosError).response?.status === 409
          ) {
            setErrors({
              phoneNumber: "Email or phone number has already been used.",
              email: "Email or phone number has already been used."
            })
          } else {
            showErrorAlert({
              type: AlertType.ERROR,
              title: "Authentication error",
              description:
                "Unable to register your account this time. Please try again later."
            })
          }
        }
      }
    })

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" component="h1">
        Personal Information
      </Typography>

      <FormControl required fullWidth sx={{ height: 84 }}>
        <FormLabel>First Name</FormLabel>
        <TextField
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          id="first-name-input"
          data-testid="first-name-input"
          placeholder="ex: John"
          variant="outlined"
          size="small"
          error={errors.firstName != null}
          helperText={errors.firstName ?? undefined}
        />
      </FormControl>

      <FormControl required fullWidth sx={{ height: 84 }}>
        <FormLabel>Last Name</FormLabel>
        <TextField
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          id="last-name-input"
          data-testid="last-name-input"
          placeholder="ex: Doe"
          variant="outlined"
          size="small"
          error={errors.lastName != null}
          helperText={touched.lastName ? errors.lastName : undefined}
        />
      </FormControl>

      <FormControl required fullWidth sx={{ height: 84 }}>
        <FormLabel>Email</FormLabel>
        <TextField
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email-input"
          data-testid="email-input"
          placeholder="ex: example@email.com"
          variant="outlined"
          size="small"
          error={errors.email != null}
          helperText={touched.email ? errors.email : undefined}
        />
      </FormControl>

      <FormControl required fullWidth sx={{ height: 84 }}>
        <FormLabel>Username</FormLabel>
        <TextField
          name="username"
          value={values.username}
          onChange={handleChange}
          id="username-input"
          data-testid="username-input"
          placeholder="ex: username"
          variant="outlined"
          size="small"
          error={errors.username != null}
          helperText={touched.username ? errors.username : undefined}
        />
      </FormControl>

      <Typography variant="h6" component="h1">
        Credentials
      </Typography>

      <FormControl required fullWidth sx={{ height: 84 }}>
        <FormLabel>Phone Number</FormLabel>
        <TextField
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          id="phone-number-input"
          data-testid="phone-number-input"
          placeholder="ex: 0912345678"
          variant="outlined"
          size="small"
          autoComplete="username"
          error={errors.phoneNumber != null}
          helperText={touched.phoneNumber ? errors.phoneNumber : undefined}
        />
      </FormControl>

      <FormControl required fullWidth sx={{ height: 84 }}>
        <FormLabel>Password</FormLabel>
        <TextField
          name="password"
          value={values.password}
          onChange={handleChange}
          id="password-input"
          data-testid="password-input"
          placeholder="ex: password"
          variant="outlined"
          size="small"
          autoComplete="current-password"
          type="password"
          error={errors.password != null}
          helperText={touched.password ? errors.password : undefined}
        />
      </FormControl>

      <FormControl required fullWidth sx={{ height: 84 }}>
        <FormLabel>Repeat Password</FormLabel>
        <TextField
          name="repeatPassword"
          value={values.repeatPassword}
          onChange={handleChange}
          id="repeat-password-input"
          data-testid="repeat-password-input"
          placeholder="ex: password"
          variant="outlined"
          size="small"
          type="password"
          error={errors.repeatPassword != null}
          helperText={
            touched.repeatPassword ? errors.repeatPassword : undefined
          }
        />
      </FormControl>

      <Box sx={{ height: 24 }} />

      <ContainedButton
        type="submit"
        onClick={() => handleSubmit()}
        disabled={false}
        variant="contained"
        label="Next"
        height="40px"
        width="100%"
      />
    </form>
  )
}

export default CustomerRegisterForm
