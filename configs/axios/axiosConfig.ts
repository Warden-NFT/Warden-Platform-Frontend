import Axios from "axios"
import { getCookie } from "../../utils/cookie/cookieHandler"

export const client = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_WARDEN_API_URL
})
client.interceptors.request.use(
  (req) => {
    if (!req.headers.Authorization) {
      const token = getCookie("token")
      req.headers.Authorization = `Bearer ${token}`
      return req
    } else return req
  },
  (error) => Promise.reject(error)
)
