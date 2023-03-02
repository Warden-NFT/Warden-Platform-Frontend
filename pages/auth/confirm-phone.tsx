import { Alert, Grid, Snackbar } from "@mui/material"
import React, { useContext, useState } from "react"
import FadeEntrance from "../../components/motion/FadeEntrance"
import { UserContext } from "../../contexts/user/UserContext"
import { useRouter } from "next/navigation"
import { useOTP } from "../../hooks/useOTP"
import { client } from "../../configs/axios/axiosConfig"
import { AlertType } from "../../interfaces/modal/alert.interface"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import OTPLayout from "../../components/UI/input/OTPLayout"

function ConfirmPhone() {
  const [openOtpErrorSnackbar, setOpenOtpErrorSnackbar] = useState(false)
  const [openOtpSuccessSnackbar, setOpenOtpSuccessSnackbar] = useState(false)

  const { user } = useContext(UserContext)
  const { verifyOTP, otp, setOtp, otpToken, setOtpToken } = useOTP()
  const router = useRouter()
  const { showErrorAlert } = useContext(LayoutContext)

  async function handleSubmit() {
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
        router.push("/marketplace")
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

  return (
    <Grid container spacing={0} marginTop={4} justifyContent="center">
      <Grid item xs={12} sm={8} lg={6}>
        <FadeEntrance>
          <OTPLayout
            otp={otp}
            setOtp={setOtp}
            handleSubmit={handleSubmit}
            setOtpToken={setOtpToken}
          />
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
