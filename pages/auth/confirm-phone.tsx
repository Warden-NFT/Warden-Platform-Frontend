import { Alert, Grid, Link, Snackbar, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import FadeEntrance from "../../components/motion/FadeEntrance"
import ContainerCard from "../../components/UI/card/ContainerCard"
import OtpInput from "react-otp-input"
import { Box } from "@mui/system"
import ContainedButton from "../../components/UI/button/ContainedButton"
import { UserContext } from "../../contexts/user/UserContext"
import { useRouter } from "next/navigation"
import { useOTP } from "../../hooks/useOTP"
import { client } from "../../configs/axios/axiosConfig"
import { AlertType } from "../../interfaces/modal/alert.interface"
import { LayoutContext } from "../../contexts/layout/LayoutContext"

function ConfirmPhone() {
  const [otpToken, setOtpToken] = useState("")
  const [seconds, setSeconds] = useState<number>(0)
  const [openOtpErrorSnackbar, setOpenOtpErrorSnackbar] = useState(false)
  const [openOtpSuccessSnackbar, setOpenOtpSuccessSnackbar] = useState(false)

  const { user } = useContext(UserContext)
  const { getOTP, verifyOTP, otp, setOtp } = useOTP(user)
  const router = useRouter()
  const { showErrorAlert } = useContext(LayoutContext)

  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }

  const handleSubmit = async () => {
    const verificationSuccessful = await verifyOTP(otpToken, otp)
    if (verificationSuccessful) {
      const payload = {
        verificationStatus: "Verified"
      }
      try {
        await client.put("/user/setVerificationStatus", payload)
      } catch (error) {
        showErrorAlert({
          type: AlertType.ERROR,
          title: "Error",
          description: "Error updating verification status. Please try again."
        })
      }
      setOpenOtpSuccessSnackbar(true)
      setTimeout(() => {
        router.push("/home")
      }, 3000)
    } else setOpenOtpErrorSnackbar(true)
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpenOtpErrorSnackbar(false)
  }

  const requestOTP = async () => {
    setSeconds(60)
    const token = await getOTP()
    if (token) setOtpToken(token)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds: number) => {
        if (seconds === 0) {
          clearInterval(interval)
        }
        return seconds - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Grid container spacing={0} marginTop={4} justifyContent="center">
      <Grid item xs={12} sm={8} lg={6}>
        <FadeEntrance>
          <ContainerCard>
            <>
              <Typography variant="h5" fontWeight="bold" component="h1">
                Verify your phone number
              </Typography>
              <Typography component="p">
                A 6-digit code is sent to your phone.
              </Typography>
              <Box sx={{ my: 2 }} />
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span>-</span>}
                inputStyle={{ padding: "0.75rem", margin: "0.5rem" }}
              />
              <Box sx={{ my: 2 }} />
              {seconds > 0 ? (
                <Typography>Try again in {seconds} seconds.</Typography>
              ) : (
                <Typography component="p">
                  Click here to receive the OTP code.{" "}
                  <Link
                    onClick={requestOTP}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    Send OTP code
                  </Link>
                </Typography>
              )}
              <Box sx={{ my: 2 }} />
              <ContainedButton
                onClick={() => handleSubmit()}
                disabled={otp.length < 6}
                variant="contained"
                label="Next"
                height="40px"
                width="100%"
              />
            </>
          </ContainerCard>
        </FadeEntrance>
      </Grid>
      <Snackbar
        open={openOtpErrorSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Incorrect OTP. Please try again."
      >
        <Alert severity="error">Incorrect OTP. Please try again.</Alert>
      </Snackbar>
      <Snackbar
        open={openOtpSuccessSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
        message="OTP verified. Redirecting you to the home page."
      >
        <Alert severity="success">
          OTP verified. Redirecting you to the home page.
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default ConfirmPhone
