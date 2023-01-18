import { Grid, Link, Snackbar, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import FadeEntrance from '../../components/motion/FadeEntrance'
import ContainerCard from '../../components/UI/card/ContainerCard'
import OtpInput from 'react-otp-input'
import { Box } from '@mui/system'
import ContainedButton from '../../components/UI/button/ContainedButton'
import { UserContext } from '../../contexts/user/UserContext'
import { useRouter } from 'next/navigation'
import { useOTP } from '../../hooks/useOTP'

function ConfirmPhone() {
  const [otpToken, setOtpToken] = useState('')
  const [seconds, setSeconds] = useState<number>(0)
  const [openOtpErrorSnackbar, setOpenOtpErrorSnackbar] = useState(false)

  const { user } = useContext(UserContext)
  const { getOTP, verifyOTP, otp, setOtp } = useOTP(user)
  const router = useRouter()

  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }

  const handleSubmit = async () => {
    const verificationSuccessful = await verifyOTP(otpToken, otp)
    if (verificationSuccessful) router.push('/home')
    else setOpenOtpErrorSnackbar(true)
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
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
    console.log('REQUEST OTP')
  }, [])

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
                inputStyle={{ padding: '0.75rem', margin: '0.5rem' }}
              />
              <Box sx={{ my: 2 }} />
              {seconds > 0 ? (
                <Typography>Try again in {seconds} seconds.</Typography>
              ) : (
                <Typography component="p">
                  Click here to receive the OTP code.{' '}
                  <Link
                    onClick={requestOTP}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
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
        autoHideDuration={6000}
        onClose={handleClose}
        message="Incorrect OTP. Please try again."
        color="error"
      />
    </Grid>
  )
}

export default ConfirmPhone
