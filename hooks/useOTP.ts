import { useContext, useState } from "react"
import { client } from "../configs/axios/axiosConfig"
import { LayoutContext } from "../contexts/layout/LayoutContext"
import { RequestOtpResponseDTO } from "../interfaces/auth/otp.interface"
import { User } from "../interfaces/auth/user.interface"
import { AlertType } from "../interfaces/modal/alert.interface"

export const useOTP = (user?: User) => {
  // Hooks
  const { showErrorAlert } = useContext(LayoutContext)

  // States
  const [otp, setOtp] = useState("")
  const [otpToken, setOtpToken] = useState("")

  const getOTP = async (): Promise<string | undefined> => {
    if (!user) return ""
    try {
      const otpRes = await client.get<RequestOtpResponseDTO>(
        `/otp/request/${user.phoneNumber}`
      )
      return otpRes.data.data.token
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Verification Error",
        description: "Incorrect OTP. Please enter the correct 6-digit code."
      })
    }
  }

  const verifyOTP = async (otpToken: string, otp: string): Promise<boolean> => {
    const data = {
      token: otpToken,
      pin: otp
    }
    const otpRes = await client.post<RequestOtpResponseDTO>(
      "/otp/verifyOTP",
      data
    )
    if (otpRes.status === 200) return true
    else return false
  }

  return {
    otp,
    setOtp,
    otpToken,
    setOtpToken,
    getOTP,
    verifyOTP
  }
}
