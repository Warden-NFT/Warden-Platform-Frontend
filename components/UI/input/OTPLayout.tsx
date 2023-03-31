import { Box, Typography, Link, Stack } from "@mui/material"
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"
import OtpInput from "react-otp-input"
import { UserContext } from "../../../contexts/user/UserContext"
import { useOTP } from "../../../hooks/useOTP"
import ContainedButton from "../button/ContainedButton"
import ContainerCard from "../card/ContainerCard"

interface P {
  otp: string
  setOtp: Dispatch<SetStateAction<string>>
  handleSubmit: () => Promise<void>
  setOtpToken: Dispatch<SetStateAction<string>>
}

function OTPLayout({ otp, setOtp, handleSubmit, setOtpToken }: P) {
  const { getOTP } = useOTP()
  const [seconds, setSeconds] = useState(0)

  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }

  const requestOTP = async () => {
    setSeconds(60)
    const token = await getOTP()
    if (token) setOtpToken(token)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((second) => second - 1)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  return (
    <ContainerCard>
      <>
        <Typography variant="h5" fontWeight="bold" component="h1">
          Verify your phone number
        </Typography>

        <Box sx={{ my: 2 }} />
        {seconds > 0 ? (
          <Stack direction="column">
            <Typography fontWeight="600" sx={{ mr: 1 }}>
              Step 1.
            </Typography>

            <Typography>OTP Sent! Try again in {seconds} seconds.</Typography>
          </Stack>
        ) : (
          <Stack direction="column">
            <Typography fontWeight="600" sx={{ mr: 1 }}>
              {"Step 1."}
            </Typography>
            <Typography component="p">
              Click here to receive the OTP code.{" "}
              <Link
                onClick={requestOTP}
                sx={{ "&:hover": { cursor: "pointer" }, fontWeight: "600" }}
              >
                Send OTP code
              </Link>
            </Typography>
          </Stack>
        )}
        <Stack direction="column">
          <Typography fontWeight="600" sx={{ mr: 1 }}>
            {"Step 2."}
          </Typography>
          <Typography component="p">
            Input 6-digit code is sent to your phone.
          </Typography>
        </Stack>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span>-</span>}
          inputStyle={{ padding: "0.75rem", margin: "0.5rem" }}
        />
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
  )
}

export default OTPLayout
