import {
  Divider,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext, useEffect } from "react"
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

function Login() {
  const { user, setUserInfo } = useContext(UserContext)
  const router = useRouter()
  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      phoneNumber: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async (data) => {
      try {
        const res = await client.post<SuccessfulAuthDTO>("/user/login", data)
        setUserInfo(res.data)
        router.push("/")
      } catch (error) {
        console.log(error)
      }
    }
  })

  useEffect(() => {
    if (user) router.push("/home")
  }, [user])

  if (user) return null
  return (
    <Grid container spacing={0} marginTop={4} justifyContent="center">
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
                  id="phone-number-input"
                  data-testid="phone-number-input"
                  placeholder="ex: 0912345678"
                  variant="outlined"
                  size="small"
                  autoComplete="username"
                  error={errors.phoneNumber != null}
                  helperText={
                    touched.phoneNumber ? errors.phoneNumber : undefined
                  }
                />
              </FormControl>

              <FormControl required sx={{ width: "100%", height: 84 }}>
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

              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <Typography>
                  No account? <Link href="/auth/register">Register here</Link>
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
