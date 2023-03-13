import {
  Divider,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext } from "react"
import ContainerCard from "../../components/UI/card/ContainerCard"
import { useFormik } from "formik"
import ContainedButton from "../../components/UI/button/ContainedButton"
import { LoginSchema } from "../../schema/auth/login.schema"
import Link from "next/link"
import { client } from "../../configs/axios/axiosConfig"
import { SuccessfulAuthDTO } from "../../interfaces/auth/auth.interface"
import { UserContext } from "../../contexts/user/UserContext"
import { useRouter } from "next/router"
import FadeEntrance from "../../components/motion/FadeEntrance"
import Axios, { AxiosError } from "axios"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import { AlertType } from "../../interfaces/modal/alert.interface"
import { BotPreventionContext } from "../../contexts/user/BotPreventionContext"
import Head from "next/head"

function Login() {
  const { user, setUserInfo } = useContext(UserContext)
  const router = useRouter()
  const { referrer } = router.query
  const { showErrorAlert } = useContext(LayoutContext)
  const { showRecaptcha } = useContext(BotPreventionContext)

  const {
    values,
    handleChange,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    setErrors
  } = useFormik({
    initialValues: {
      phoneNumber: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async (data) => {
      try {
        const res = await client.post<SuccessfulAuthDTO>("/user/login", data)
        setUserInfo(res.data)
        if (referrer) {
          router.push(referrer as string)
          return
        } else {
          router.push("/marketplace")
        }
      } catch (error) {
        if (
          Axios.isAxiosError(error) &&
          (error as AxiosError).response?.status === 401
        ) {
          setErrors({
            phoneNumber: "Incorrect phone number or password",
            password: "Incorrect phone number or password"
          })
        } else {
          showErrorAlert({
            type: AlertType.ERROR,
            title: "Authentication error",
            description: "Unable to login at this time. Please try again later."
          })
        }
      }
    }
  })

  if (user) return null
  return (
    <Grid container spacing={0} marginTop={4} justifyContent="center">
      <Head>
        <title>Login to Warden</title>
      </Head>
      <Grid item xs={12} sm={8} lg={6}>
        <FadeEntrance>
          <ContainerCard>
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" fontWeight="bold" component="h1">
                Log in
              </Typography>

              <Divider sx={{ my: 2 }} />

              <FormControl required sx={{ width: "100%", height: 84 }}>
                <FormLabel>Phone Number</FormLabel>
                <TextField
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onKeyUp={handleBlur("phoneNumber")}
                  id="phone-number-input"
                  data-testid="phone-number-input"
                  placeholder="ex: 0912345678"
                  variant="outlined"
                  size="small"
                  autoComplete="username"
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </FormControl>

              <FormControl required sx={{ width: "100%", height: 84 }}>
                <FormLabel>Password</FormLabel>
                <TextField
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onKeyUp={handleBlur("password")}
                  id="password-input"
                  data-testid="password-input"
                  placeholder="ex: password"
                  variant="outlined"
                  size="small"
                  autoComplete="current-password"
                  type="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </FormControl>

              <Box sx={{ height: 24 }} />

              <ContainedButton
                type="submit"
                onClick={() => {
                  showRecaptcha()
                  handleSubmit()
                }}
                disabled={false}
                variant="contained"
                label="Log in"
                height="40px"
                width="100%"
              />

              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <Typography>
                  No account?
                  <Link
                    href={{
                      pathname: "/auth/register",
                      query: {
                        referrer
                      }
                    }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Box>
            </form>
          </ContainerCard>
        </FadeEntrance>
      </Grid>
    </Grid>
  )
}

export default Login
