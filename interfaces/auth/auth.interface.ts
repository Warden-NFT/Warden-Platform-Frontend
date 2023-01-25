import { UserGeneralInfo } from "./user.interface"

export interface SuccessfulAuthDTO {
  status: number
  messageg: string
  jwt: string
  user: UserGeneralInfo
}

export type Verification = "NotVerified" | "Verified"
