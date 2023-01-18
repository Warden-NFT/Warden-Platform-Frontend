import { useState } from 'react'
import { client } from '../configs/axios/axiosConfig'
import { RequestOtpResponseDTO } from '../interfaces/auth/otp.interface'
import { User } from '../interfaces/auth/user.interface'

export const useOTP = (user?: User) => {
  const [otp, setOtp] = useState('')
  const [otpToken, setOtpToken] = useState('')

  const getOTP = async (): Promise<string | undefined> => {
    if (!user) return ''
    try {
      const otpRes = await client.get<RequestOtpResponseDTO>(
        `/otp/request/${user.phoneNumber}`
      )
      console.log('HERE', otpRes)
      return otpRes.data.data.token
    } catch (error) {
      console.log(error)
    }
  }

  const verifyOTP = async (otpToken: string, otp: string): Promise<boolean> => {
    const data = {
      token: otpToken,
      pin: otp
    }
    const otpRes = await client.post<RequestOtpResponseDTO>(
      `/otp/verifyOTP`,
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
